// src/types/job.ts
export interface Job {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  location: string;
  jobLink?: string;
  appliedDate?: string;
  resumeFileName?: string;
  resumeFilePath?: string;
}

export type JobStatus = 'Applied' | 'Interview' | 'Rejected' | 'Selected';

export interface JobFormData {
  company: string;
  position: string;
  status: JobStatus;
  location: string;
  jobLink?: string;
}

export interface JobStatusHistory {
  id: number;
  status: string;
  changedAt: string;
}

export interface JobPage {
  content: Job[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
