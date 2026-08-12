// src/components/resume/ResumeCard.tsx
import { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { FileText, Download } from 'lucide-react';
import Button from '../common/Button';
import toast from 'react-hot-toast';

interface ResumeCardProps {
  jobId: number;
  fileName: string;
}

export default function ResumeCard({ jobId, fileName }: ResumeCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await resumeApi.downloadResume(jobId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Resume downloaded!');
    } catch {
      toast.error('Failed to download resume.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
        <FileText size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">{fileName}</p>
        <p className="text-xs text-slate-400">Resume attached</p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        icon={<Download size={14} />}
        loading={downloading}
        onClick={handleDownload}
        id={`resume-download-${jobId}`}
      >
        Download
      </Button>
    </div>
  );
}
