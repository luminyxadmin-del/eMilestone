'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { FileText, Loader2, UploadCloud, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { validateResumeFile } from '@/lib/validations';
import { cn } from '@/lib/utils';

interface ResumeDropzoneProps {
  /** Called with the storage path once the upload lands, or '' when cleared. */
  onUploaded: (path: string) => void;
  error?: string;
}

type Status = 'idle' | 'uploading' | 'done';

export function ResumeDropzone({ onUploaded, error }: ResumeDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      const problem = validateResumeFile(file);
      if (problem) {
        setLocalError(problem);
        return;
      }

      setLocalError(null);
      setStatus('uploading');
      setFileName(file.name);

      try {
        const supabase = createClient();
        const bucket = process.env.NEXT_PUBLIC_SUPABASE_RESUME_BUCKET ?? 'resumes';
        const extension = file.name.split('.').pop() ?? 'pdf';
        const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(path, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        setStatus('done');
        onUploaded(path);
      } catch {
        setStatus('idle');
        setFileName('');
        setLocalError(
          'The upload failed. Try again, or email the file to support@emilestones.net.',
        );
      }
    },
    [onUploaded],
  );

  const clear = () => {
    setStatus('idle');
    setFileName('');
    setLocalError(null);
    onUploaded('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const message = localError ?? error;

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) void upload(file);
        }}
        className={cn(
          'relative rounded-md border-2 border-dashed p-8 text-center transition-all duration-300',
          dragging ? 'border-amber bg-amber/5' : 'border-line bg-surface-subtle',
          message && 'border-destructive/50',
        )}
      >
        {status === 'done' ? (
          <div className="flex items-center justify-center gap-3">
            <FileText aria-hidden="true" className="size-5 text-amber-deep" />
            <span className="text-body-md text-ink">{fileName}</span>
            <button
              type="button"
              onClick={clear}
              className="rounded p-1 text-copy-muted transition-colors hover:bg-ink/5 hover:text-ink"
              aria-label="Remove uploaded resume"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : status === 'uploading' ? (
          <div className="flex items-center justify-center gap-3 text-copy-muted">
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            <span className="text-body-md">Uploading {fileName}</span>
          </div>
        ) : (
          <>
            <UploadCloud aria-hidden="true" className="mx-auto size-8 text-copy-faint" />
            <p className="mt-4 text-body-md text-copy">
              Drag your resume here, or{' '}
              <label
                htmlFor={inputId}
                className="cursor-pointer font-medium text-ink underline underline-offset-4 hover:text-amber-deep"
              >
                browse your files
              </label>
            </p>
            <p className="mt-2 text-label-md text-copy-muted">
              PDF or Word document, up to 5 MB.
            </p>
          </>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      </div>

      {message && (
        <p role="alert" className="mt-2 text-label-md text-destructive">
          {message}
        </p>
      )}
    </div>
  );
}
