// src/components/resume/ResumeUpload.tsx
import { useRef, useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import toast from 'react-hot-toast';
import { Upload, FileText } from 'lucide-react';
import Button from '../common/Button';

interface ResumeUploadProps {
  jobId: number;
  onSuccess: () => void;
  hasResume?: boolean;
}

export default function ResumeUpload({ jobId, onSuccess, hasResume = false }: ResumeUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error('Only PDF, DOC, and DOCX files are allowed.');
      return;
    }
    setUploading(true);
    try {
      await resumeApi.uploadResume(jobId, file);
      toast.success('Resume uploaded successfully!');
      onSuccess();
    } catch {
      toast.error('Failed to upload resume.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-brand-500 bg-brand-50'
            : 'border-slate-200 bg-slate-50 hover:border-brand-300 hover:bg-brand-50/30'
        }`}
        id="resume-upload-zone"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
            {uploading ? (
              <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Upload size={22} />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {uploading ? 'Uploading...' : hasResume ? 'Replace Resume' : 'Upload Resume'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">PDF, DOC, DOCX · Drag & drop or click</p>
          </div>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
        id="resume-file-input"
      />
    </div>
  );
}
