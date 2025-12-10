import { NextRequest, NextResponse } from 'next/server';
import { analyzeCropImage } from '@/lib/api/gemini';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

    const result = await analyzeCropImage(base64Data);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Diagnosis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Diagnosis failed' },
      { status: 500 }
    );
  }
}
