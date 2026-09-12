import { API_BASE } from "@/lib/api";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface UploadedImage {
  id: string;
  url: string;
  original_filename: string;
  content_type: string;
  size: number;
  width: number;
  height: number;
}

export function uploadImage(file: File, adminKey: string, onProgress: (value: number) => void, signal: AbortSignal): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const abort = () => xhr.abort();
    signal.addEventListener("abort", abort, { once: true });
    xhr.open("POST", `${API_BASE}/media/upload`);
    xhr.setRequestHeader("X-Admin-Key", adminKey);
    xhr.timeout = 180_000;
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    xhr.onload = () => {
      let result;
      try { result = JSON.parse(xhr.responseText); } catch { result = null; }
      if (xhr.status === 201 && typeof result?.url === "string") {
        resolve(result as UploadedImage);
      } else {
        const message = xhr.status === 401 ? "Check your admin key and try again."
          : typeof result?.detail === "string" ? result.detail : "Couldn't upload the image. Please try again.";
        reject(new Error(message));
      }
    };
    xhr.onerror = () => reject(new Error("Upload interrupted. Check your connection and try again."));
    xhr.ontimeout = () => reject(new Error("The upload timed out. Please try again."));
    xhr.onabort = () => reject(new DOMException("Upload cancelled", "AbortError"));
    xhr.onloadend = () => signal.removeEventListener("abort", abort);
    const form = new FormData();
    form.append("file", file);
    xhr.send(form);
    if (signal.aborted) xhr.abort();
  });
}