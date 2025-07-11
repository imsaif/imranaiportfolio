'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong globally!</h2>
          <button onClick={() => reset()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
