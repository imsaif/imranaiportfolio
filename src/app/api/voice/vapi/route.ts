/**
 * Vapi.ai API Route Handler
 * Handles TTS requests and Vapi.ai integration
 */

import { NextRequest, NextResponse } from 'next/server';

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY;
const VAPI_BASE_URL = 'https://api.vapi.ai';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!VAPI_API_KEY) {
      console.error('Vapi.ai API key not configured');
      return NextResponse.json(
        { error: 'Vapi.ai not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { text, voice, assistantId } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('🎵 Processing Vapi.ai TTS request:', {
      textLength: text.length,
      voice: voice?.voiceId || 'default',
      assistantId: assistantId || 'none'
    });

    // For text-to-speech, we'll use a direct TTS approach
    // Note: This is a simplified implementation. In production,
    // you might want to create a temporary assistant or use Vapi's TTS endpoint
    
    const ttsPayload = {
      text: text,
      voice: voice || {
        provider: 'azure',
        voiceId: 'andrew'
      }
    };

    // Make request to Vapi.ai TTS endpoint
    const vapiResponse = await fetch(`${VAPI_BASE_URL}/tts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ttsPayload),
    });

    if (!vapiResponse.ok) {
      const errorText = await vapiResponse.text();
      console.error('Vapi.ai API error:', vapiResponse.status, errorText);
      
      return NextResponse.json(
        { 
          error: 'Vapi.ai API error', 
          details: errorText,
          status: vapiResponse.status 
        },
        { status: vapiResponse.status }
      );
    }

    // Check if response is audio
    const contentType = vapiResponse.headers.get('content-type');
    if (contentType?.includes('audio')) {
      const audioBuffer = await vapiResponse.arrayBuffer();
      
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': audioBuffer.byteLength.toString(),
        },
      });
    } else {
      // If not audio, it might be a JSON response with audio URL or data
      const jsonResponse = await vapiResponse.json();
      
      if (jsonResponse.audioUrl) {
        // Fetch the audio from the provided URL
        const audioResponse = await fetch(jsonResponse.audioUrl);
        const audioBuffer = await audioResponse.arrayBuffer();
        
        return new NextResponse(audioBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuffer.byteLength.toString(),
          },
        });
      }
      
      return NextResponse.json(jsonResponse);
    }

  } catch (error) {
    console.error('Vapi.ai route error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle CORS if needed
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}