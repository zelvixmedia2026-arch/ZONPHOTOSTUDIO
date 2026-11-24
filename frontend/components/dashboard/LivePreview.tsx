"use client";

interface LivePreviewProps {
  original: string | null;
  processed: string | null;
}

export default function LivePreview({
  original,
  processed,
}: LivePreviewProps) {
  return (
    <div className="rounded-3xl border border-[#ECE6D7] bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Live Preview
      </h2>

      <p className="mt-2 text-gray-500">
        Compare the uploaded image with the AI result.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">

        {/* Original */}

        <div>

          <h3 className="mb-3 text-center font-semibold">
            Original
          </h3>

          <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">

            {original ? (

              <img
                src={original}
                className="h-full w-full object-cover"
                alt="Original"
              />

            ) : (

              <span className="text-gray-400">
                No Image
              </span>

            )}

          </div>

        </div>

        {/* AI Result */}

        <div>

          <h3 className="mb-3 text-center font-semibold">
            AI Result
          </h3>

          <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl border bg-gray-50">

            {processed ? (

              <img
                src={processed}
                className="h-full w-full object-cover"
                alt="Processed"
              />

            ) : (

              <span className="text-gray-400">
                Waiting...
              </span>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}