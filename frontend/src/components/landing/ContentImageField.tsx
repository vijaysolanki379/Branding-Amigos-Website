import { useEffect, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, uploadImage } from "@/lib/media";

interface ContentImageFieldProps {
  fieldKey: string;
  label: string;
  value: string;
  adminKey: string;
  disabled: boolean;
  inputClassName: string;
  onChange: (value: string) => void;
  onUploading: (uploading: boolean) => void;
}

export const ContentImageField = ({ fieldKey, label, value, adminKey, disabled, inputClassName, onChange, onUploading }: ContentImageFieldProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [failedPreview, setFailedPreview] = useState<string | null>(null);
  const testId = `content-image-${fieldKey.replaceAll("_", "-")}`;

  useEffect(() => () => controller.current?.abort(), []);

  const upload = async (file?: File) => {
    if (!file || disabled || uploading) return;
    setError("");
    setNotice("");
    if (!adminKey) { setError("Enter your admin key before uploading."); return; }
    if (!IMAGE_TYPES.includes(file.type)) { setError("Choose a JPG, PNG, WebP, or GIF image."); return; }
    if (file.size > MAX_IMAGE_BYTES) { setError("Choose an image no larger than 5 MB."); return; }
    if (!file.size) { setError("The selected image is empty."); return; }
    const request = new AbortController();
    controller.current = request;
    setUploading(true);
    onUploading(true);
    setProgress(0);
    try {
      const result = await uploadImage(file, adminKey, setProgress, request.signal);
      if (request.signal.aborted) return;
      onChange(result.url);
      setFailedPreview(null);
      setNotice("Uploaded — save changes to publish.");
    } catch (cause) {
      if (!request.signal.aborted) setError(cause instanceof Error ? cause.message : "Couldn't upload the image.");
    } finally {
      if (!request.signal.aborted) { setUploading(false); onUploading(false); }
    }
  };

  return (
    <div className="min-w-0" data-testid={`${testId}-field`}>
      <input id={`field-${fieldKey}`} data-testid={`content-field-${fieldKey}`} value={value} disabled={disabled || uploading}
        onChange={(event) => { onChange(event.target.value); setNotice(""); setError(""); }}
        className={inputClassName} placeholder="Image URL" />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" data-testid={`${testId}-upload-button`} disabled={disabled || uploading || !adminKey}
          onClick={() => fileInput.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#FF5A36] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#FF5A36] disabled:cursor-not-allowed disabled:opacity-50">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Upload className="h-4 w-4" aria-hidden />}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <span className="text-xs text-[#9AA2BC]" data-testid={`${testId}-limits`}>JPG, PNG, WebP, GIF · Max 5 MB</span>
      </div>
      <input ref={fileInput} type="file" accept={IMAGE_TYPES.join(",")} aria-label={`Upload ${label}`}
        data-testid={`${testId}-file-input`} className="hidden" disabled={disabled || uploading || !adminKey}
        onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; void upload(file); }} />
      {uploading && <div className="mt-3" role="status" aria-live="polite" data-testid={`${testId}-progress-status`}>
        <progress max={100} value={progress} aria-label={`${label} upload progress`} data-testid={`${testId}-progress`} className="h-1.5 w-full accent-[#FF5A36]" />
        <p className="mt-1 text-xs text-[#9AA2BC]">{progress === 100 ? "Saving image…" : `Uploading ${progress}%`}</p>
      </div>}
      {notice && <p role="status" data-testid={`${testId}-success`} className="mt-2 text-sm text-emerald-400">{notice}</p>}
      {error && <p role="alert" data-testid={`${testId}-error`} className="mt-2 text-sm text-[#FF856C]">{error}</p>}
      {value && value !== failedPreview && <img key={value} src={value} alt={`Preview of ${label}`} data-testid={`${testId}-preview`}
        onError={() => setFailedPreview(value)} className="mt-3 max-h-48 max-w-full rounded-lg border border-white/10 object-contain" />}
      {value && value === failedPreview && <p role="alert" data-testid={`${testId}-preview-error`} className="mt-2 text-xs text-[#FF856C]">Image preview unavailable. Check the image URL or upload another image.</p>}
    </div>
  );
};