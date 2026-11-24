export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export interface ProcessResult {
  imageUrl: string;
  fileName: string;
}

export async function removeBackground(
  file: File,
  colorHex: string
): Promise<ProcessResult> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("background_color", colorHex);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/background/replace`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error("Cannot reach the server. Make sure the backend is running.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.detail;
    throw new Error(
      typeof detail === "string" ? detail : "Processing failed. Please try again."
    );
  }

  if (!data?.success || !data?.data?.image_url) {
    throw new Error(data?.message ?? "Processing failed. Please try again.");
  }

  return {
    imageUrl: `${API_BASE_URL}${data.data.image_url}`,
    fileName: data.data.output_file,
  };
}