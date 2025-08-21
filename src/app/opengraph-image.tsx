import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';
export const alt = 'Imran Mohammed - AI Experience Designer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          fontFamily: 'system-ui',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: 60, margin: 0 }}>Imran Mohammed</h1>
          <h2 style={{ fontSize: 30, margin: 0, color: '#7075e0' }}>
            AI Experience Designer
          </h2>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
} 