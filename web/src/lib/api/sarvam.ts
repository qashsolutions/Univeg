// Sarvam AI API client for Indian language TTS/STT

type SarvamLanguage = 'hi-IN' | 'te-IN' | 'ta-IN' | 'kn-IN' | 'mr-IN' | 'gu-IN' | 'en-IN';

interface TranslateRequest {
  text: string;
  sourceLanguage: SarvamLanguage;
  targetLanguage: SarvamLanguage;
}

interface TranslateResponse {
  translated_text: string;
}

interface TTSRequest {
  text: string;
  language: SarvamLanguage;
  speaker?: 'meera' | 'pavithra' | 'maitreyi' | 'arvind' | 'karthik';
  pitch?: number;
  pace?: number;
}

interface TTSResponse {
  audio_content: string; // Base64 encoded audio
}

interface STTResponse {
  transcript: string;
  language_code: string;
  confidence: number;
}

const SARVAM_BASE_URL = 'https://api.sarvam.ai';

async function sarvamFetch<T>(endpoint: string, body: object): Promise<T> {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error('SARVAM_API_KEY not configured');
  }

  const response = await fetch(`${SARVAM_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Subscription-Key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sarvam API error: ${error}`);
  }

  return response.json();
}

/**
 * Translate text between Indian languages
 */
export async function translateText(request: TranslateRequest): Promise<string> {
  const response = await sarvamFetch<TranslateResponse>('/translate', {
    input: request.text,
    source_language_code: request.sourceLanguage,
    target_language_code: request.targetLanguage,
    mode: 'formal',
    enable_preprocessing: true,
  });

  return response.translated_text;
}

/**
 * Convert text to speech in Indian languages
 */
export async function textToSpeech(request: TTSRequest): Promise<string> {
  const response = await sarvamFetch<TTSResponse>('/text-to-speech', {
    inputs: [request.text],
    target_language_code: request.language,
    speaker: request.speaker || 'meera',
    pitch: request.pitch || 0,
    pace: request.pace || 1.0,
    loudness: 1.5,
    speech_sample_rate: 22050,
    enable_preprocessing: true,
    model: 'bulbul:v1',
  });

  return response.audio_content;
}

/**
 * Convert speech to text (transcription)
 */
export async function speechToText(
  audioBase64: string,
  language: SarvamLanguage
): Promise<STTResponse> {
  const response = await sarvamFetch<STTResponse>('/speech-to-text', {
    audio: audioBase64,
    language_code: language,
    model: 'saarika:v2',
  });

  return response;
}

/**
 * Map app language code to Sarvam language code
 */
export function toSarvamLanguage(langCode: string): SarvamLanguage {
  const mapping: Record<string, SarvamLanguage> = {
    en: 'en-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    kn: 'kn-IN',
    mr: 'mr-IN',
    gu: 'gu-IN',
  };
  return mapping[langCode] || 'hi-IN';
}

export type { SarvamLanguage, TranslateRequest, TTSRequest, STTResponse };
