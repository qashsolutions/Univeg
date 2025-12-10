# Geo-Video Matching System Architecture

## Overview

This document describes the technical architecture for location-based video discovery in Kisan Mitra. The system matches farmers with field demonstration videos based on geographic proximity, without requiring explicit location permission.

---

## I. Location Determination Strategy

### 1.1 Location Hierarchy (Fallback Chain)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          LOCATION DETERMINATION PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   PRIORITY 1: GPS (if granted)                                                       │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │  - Precise coordinates from device GPS                                   │       │
│   │  - Accuracy: ~10 meters                                                  │       │
│   │  - Requires explicit permission                                          │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                         │                                            │
│                                         ▼ (if denied/unavailable)                    │
│   PRIORITY 2: IP Geolocation                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │  - Approximate location from IP address                                  │       │
│   │  - Accuracy: District/City level (~10-50 km)                            │       │
│   │  - No permission required                                                │       │
│   │  - Service: MaxMind GeoIP2 or similar                                   │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                         │                                            │
│                                         ▼ (if IP not reliable)                       │
│   PRIORITY 3: User Profile Input                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │  - Village name / District / State from registration                    │       │
│   │  - Geocoded using India postal/administrative database                  │       │
│   │  - Accuracy: Village centroid (~1-5 km)                                 │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                         │                                            │
│                                         ▼ (if no profile data)                       │
│   PRIORITY 4: Delivery Address                                                       │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │  - Extract from past orders                                              │       │
│   │  - Geocode PIN code to coordinates                                      │       │
│   │  - Accuracy: PIN code area (~5-10 km)                                   │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Village/District to Coordinates Mapping

```python
# India Administrative Geocoding Database Structure

GEOCODE_DATABASE = {
    "states": {
        "maharashtra": {
            "center": {"lat": 19.7515, "lng": 75.7139},
            "districts": {
                "nashik": {
                    "center": {"lat": 19.9975, "lng": 73.7898},
                    "talukas": {
                        "sinnar": {
                            "center": {"lat": 19.8432, "lng": 73.9123},
                            "villages": {
                                "ozar": {"lat": 19.8612, "lng": 73.9234},
                                "vavi": {"lat": 19.8234, "lng": 73.8912},
                                # ... 200+ villages per taluka
                            }
                        }
                    }
                }
            }
        }
    }
}

# Data sources:
# - Census of India 2011 village directory
# - India Post PIN code database
# - Survey of India administrative boundaries
# - OpenStreetMap India extracts
```

### 1.3 Location Input UI

When user provides text input:

```
User Input                    Geocoding Strategy
─────────────────────────────────────────────────────────────
"Nashik"                  →   District centroid
"Nashik, Maharashtra"     →   District centroid (verified)
"Sinnar"                  →   Taluka centroid
"Ozar village"            →   Village centroid
"422103"                  →   PIN code centroid
"Near Shirdi"             →   Landmark + radius search
```

---

## II. Video Metadata Schema

### 2.1 Video Record Structure

```json
{
  "video_id": "VID_2024_TOM_001",
  "title": "Tomato Hybrid 512 - Flowering Stage",
  "crop_type": "tomato",
  "seed_variety": "hybrid_512",
  "growth_stage": "flowering",
  "duration_seconds": 222,

  "geo": {
    "coordinates": {
      "latitude": 19.8432,
      "longitude": 73.9123
    },
    "accuracy_meters": 50,
    "source": "device_gps",
    "recorded_at": "2024-11-15T10:30:00Z"
  },

  "location_text": {
    "village": "Ozar",
    "taluka": "Sinnar",
    "district": "Nashik",
    "state": "Maharashtra",
    "country": "IN"
  },

  "farmer": {
    "farmer_id": "FRM_001",
    "name": "Suresh Patil",
    "verified": true
  },

  "language": "mr",  // Marathi
  "languages_available": ["mr", "hi"],

  "media": {
    "thumbnail_url": "s3://videos/VID_2024_TOM_001/thumb.jpg",
    "video_url": "s3://videos/VID_2024_TOM_001/video.mp4",
    "hls_url": "s3://videos/VID_2024_TOM_001/master.m3u8"
  },

  "metadata": {
    "views": 1245,
    "uploaded_at": "2024-11-15T14:00:00Z",
    "file_size_bytes": 45000000,
    "resolution": "1080p"
  }
}
```

### 2.2 Geospatial Index

```sql
-- PostgreSQL with PostGIS extension

CREATE TABLE videos (
    video_id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    crop_type VARCHAR(50),
    seed_variety VARCHAR(50),
    location GEOGRAPHY(POINT, 4326),  -- WGS84 coordinate system
    location_text JSONB,
    language VARCHAR(5),
    farmer_id VARCHAR(50),
    uploaded_at TIMESTAMP,
    views INTEGER DEFAULT 0
);

-- Spatial index for proximity queries
CREATE INDEX idx_videos_location ON videos USING GIST(location);

-- Compound index for filtered proximity queries
CREATE INDEX idx_videos_crop_location ON videos USING GIST(location) WHERE crop_type IS NOT NULL;
```

---

## III. Distance Calculation & Sorting

### 3.1 Haversine Distance Query

```sql
-- Find videos within radius, sorted by distance

SELECT
    video_id,
    title,
    crop_type,
    farmer_name,
    ST_Distance(
        location,
        ST_SetSRID(ST_MakePoint(:user_lng, :user_lat), 4326)::geography
    ) / 1000 AS distance_km,
    location_text
FROM videos
WHERE
    ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint(:user_lng, :user_lat), 4326)::geography,
        :radius_meters  -- e.g., 500000 for 500km
    )
    AND (:crop_filter IS NULL OR crop_type = :crop_filter)
    AND (:language_filter IS NULL OR language = :language_filter)
ORDER BY
    distance_km ASC,
    views DESC
LIMIT :limit
OFFSET :offset;
```

### 3.2 Distance Buckets for UI

```python
def categorize_distance(distance_km: float) -> dict:
    """
    Categorize video distance for UI display
    """
    if distance_km < 25:
        return {
            "label": "Nearby",
            "color": "#6B7B3C",  # Olive/Green
            "priority": 1
        }
    elif distance_km < 100:
        return {
            "label": "In Your Region",
            "color": "#D4A84B",  # Harvest Gold
            "priority": 2
        }
    elif distance_km < 300:
        return {
            "label": "In Your State",
            "color": "#C45D3E",  # Terracotta
            "priority": 3
        }
    else:
        return {
            "label": "Other Regions",
            "color": "#5D4E37",  # Earth Brown
            "priority": 4
        }
```

---

## IV. Video Geo-Tagging Pipeline

### 4.1 Upload Flow with Location Extraction

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           VIDEO UPLOAD & GEO-TAGGING PIPELINE                        │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│   ┌─────────────┐     ┌─────────────────┐     ┌─────────────────┐                   │
│   │   FARMER    │────▶│  UPLOAD VIDEO   │────▶│   EXTRACT       │                   │
│   │   DEVICE    │     │  (Mobile App)   │     │   EXIF/XMP      │                   │
│   └─────────────┘     └─────────────────┘     └────────┬────────┘                   │
│                                                        │                             │
│                                                        ▼                             │
│                       ┌────────────────────────────────────────────┐                │
│                       │          LOCATION EXTRACTION               │                │
│                       │                                            │                │
│                       │  1. Check EXIF GPS tags                    │                │
│                       │  2. Check XMP location data                │                │
│                       │  3. Check video metadata streams           │                │
│                       │  4. Fall back to device location at upload │                │
│                       │  5. Fall back to farmer profile location   │                │
│                       └────────────────────┬───────────────────────┘                │
│                                            │                                         │
│                                            ▼                                         │
│   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐              │
│   │   REVERSE       │◀────│   COORDINATES   │────▶│   STORE IN      │              │
│   │   GEOCODE       │     │   VALIDATED     │     │   DATABASE      │              │
│   └────────┬────────┘     └─────────────────┘     └─────────────────┘              │
│            │                                                                         │
│            ▼                                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────┐       │
│   │   LOCATION TEXT ENRICHMENT                                               │       │
│   │   - Village name (from Census database)                                  │       │
│   │   - Taluka / Tehsil                                                     │       │
│   │   - District                                                             │       │
│   │   - State                                                                │       │
│   │   - PIN code (nearest)                                                   │       │
│   └─────────────────────────────────────────────────────────────────────────┘       │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 EXIF/Metadata Extraction Code

```python
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import ffmpeg
import json

def extract_video_location(video_path: str) -> dict:
    """
    Extract GPS coordinates from video file metadata
    """
    location = None

    # Method 1: FFprobe metadata extraction
    try:
        probe = ffmpeg.probe(video_path)
        format_tags = probe.get('format', {}).get('tags', {})

        # Check common GPS tag locations
        lat = format_tags.get('location', None)
        if lat:
            # Parse ISO 6709 format: +19.8432+073.9123/
            location = parse_iso6709(lat)

        # Check for com.apple.quicktime.location.ISO6709
        if not location:
            location = parse_apple_location(format_tags)

        # Check for Android location tags
        if not location:
            location = parse_android_location(format_tags)

    except Exception as e:
        print(f"FFprobe extraction failed: {e}")

    # Method 2: Extract from embedded thumbnail EXIF
    if not location:
        location = extract_from_thumbnail_exif(video_path)

    return location

def parse_iso6709(location_string: str) -> dict:
    """
    Parse ISO 6709 location format
    Examples:
        +19.8432+073.9123/
        +19.8432-073.9123+100.00/  (with altitude)
    """
    import re
    pattern = r'([+-]\d+\.?\d*)'
    matches = re.findall(pattern, location_string)

    if len(matches) >= 2:
        return {
            "latitude": float(matches[0]),
            "longitude": float(matches[1]),
            "altitude": float(matches[2]) if len(matches) > 2 else None,
            "source": "video_metadata"
        }
    return None
```

---

## V. API Endpoints

### 5.1 Video Discovery API

```yaml
# GET /api/v1/videos/nearby

Request:
  Query Parameters:
    lat: number (required) - User latitude
    lng: number (required) - User longitude
    radius_km: number (default: 500) - Search radius
    crop: string (optional) - Filter by crop type
    language: string (optional) - Filter by video language
    limit: number (default: 20, max: 50)
    offset: number (default: 0)

Response:
  {
    "user_location": {
      "latitude": 19.9975,
      "longitude": 73.7898,
      "source": "ip_geolocation",
      "accuracy_km": 25,
      "location_text": "Nashik District, Maharashtra"
    },
    "videos": [
      {
        "video_id": "VID_2024_TOM_001",
        "title": "Tomato Hybrid 512 - Flowering Stage",
        "thumbnail_url": "...",
        "duration_seconds": 222,
        "distance_km": 12.4,
        "distance_category": {
          "label": "Nearby",
          "color": "#6B7B3C"
        },
        "location_text": {
          "village": "Ozar",
          "district": "Nashik"
        },
        "language": "mr",
        "farmer_name": "Suresh Patil",
        "views": 1245
      }
    ],
    "total_count": 156,
    "has_more": true
  }
```

### 5.2 Location Resolution API

```yaml
# POST /api/v1/location/resolve

Request:
  {
    "input_type": "text",  # or "pincode", "coordinates"
    "value": "Sinnar, Nashik"
  }

Response:
  {
    "resolved": true,
    "coordinates": {
      "latitude": 19.8432,
      "longitude": 73.9123
    },
    "confidence": 0.92,
    "location_text": {
      "village": null,
      "taluka": "Sinnar",
      "district": "Nashik",
      "state": "Maharashtra"
    },
    "alternatives": [
      {
        "text": "Sinnar Taluka, Nashik",
        "coordinates": {...}
      }
    ]
  }
```

---

## VI. Privacy Considerations

### 6.1 Data Handling Principles

| Data Type | Collection | Storage | User Control |
|-----------|------------|---------|--------------|
| Precise GPS | Opt-in only | Encrypted | Can delete anytime |
| IP-based location | Automatic | Not stored permanently | Session only |
| Profile address | User provided | Encrypted | Can edit/delete |
| Video locations | Farmer consent | Public (by design) | Farmer can hide |

### 6.2 Anonymization Rules

- User's precise location is never shared with other users
- Distance shown is rounded (e.g., "~12 km" not "12.347 km")
- Farmer locations shown at village level, not precise coordinates
- Analytics aggregated at district level minimum

---

## VII. Offline Support

### 7.1 Cached Data Strategy

```javascript
// IndexedDB schema for offline video catalog

const videoStore = {
  name: 'videos',
  keyPath: 'video_id',
  indexes: [
    { name: 'by_distance', keyPath: 'cached_distance_km' },
    { name: 'by_crop', keyPath: 'crop_type' },
    { name: 'by_state', keyPath: 'location_text.state' }
  ]
};

// Cache videos within 100km on app install
// Update cache when online with delta sync
```

### 7.2 Offline Distance Calculation

When offline, use last known location and cached video coordinates to compute distances locally using Haversine formula in JavaScript.

---

*Document Version: 1.0*
*Last Updated: December 2024*
