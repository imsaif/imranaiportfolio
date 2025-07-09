import { ImageResponse } from 'next/server';

// Route segment config
export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 90,
          color: 'white',
        }}
      >
        IM
      </div>
    ),
    {
      ...size,
    }
  );
}
