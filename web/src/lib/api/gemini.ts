// Google Gemini API client for crop disease identification

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface DiagnosisResult {
  diseaseDetected: boolean;
  diseaseName: string | null;
  diseaseNameHi: string | null;
  confidence: number;
  severity: 'healthy' | 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  causes: string[];
  treatment: {
    immediate: string[];
    chemical: { name: string; dosage: string; frequency: string }[];
    organic: { name: string; application: string }[];
    cultural: string[];
  };
  prevention: string[];
  affectedParts: string[];
  spreadRisk: 'low' | 'medium' | 'high';
  estimatedYieldLoss: string;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const DIAGNOSIS_PROMPT = `You are an expert agricultural pathologist specializing in Indian crops. Analyze this plant image and provide a detailed disease diagnosis.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "diseaseDetected": true/false,
  "diseaseName": "English name or null if healthy",
  "diseaseNameHi": "Hindi name or null if healthy",
  "confidence": 0.0-1.0,
  "severity": "healthy|low|medium|high|critical",
  "symptoms": ["visible symptom 1", "symptom 2"],
  "causes": ["pathogen/cause 1", "cause 2"],
  "treatment": {
    "immediate": ["urgent action 1", "action 2"],
    "chemical": [{"name": "product name", "dosage": "amount per liter", "frequency": "application schedule"}],
    "organic": [{"name": "organic treatment", "application": "how to apply"}],
    "cultural": ["farming practice 1", "practice 2"]
  },
  "prevention": ["prevention measure 1", "measure 2"],
  "affectedParts": ["leaves", "stem", "fruit", etc.],
  "spreadRisk": "low|medium|high",
  "estimatedYieldLoss": "percentage range like 10-20%"
}

If the plant appears healthy, set diseaseDetected to false and provide general health indicators.
Be specific to Indian agricultural context and available treatments in India.`;

export async function analyzeCropImage(imageBase64: string): Promise<DiagnosisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: DIAGNOSIS_PROMPT },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: imageBase64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 32,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data: GeminiResponse = await response.json();
  const textResponse = data.candidates[0]?.content?.parts[0]?.text;

  if (!textResponse) {
    throw new Error('No response from Gemini');
  }

  // Parse JSON response, handling potential markdown code blocks
  let jsonStr = textResponse.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '');
  }

  try {
    return JSON.parse(jsonStr) as DiagnosisResult;
  } catch {
    throw new Error('Failed to parse Gemini response as JSON');
  }
}

export type { DiagnosisResult };
