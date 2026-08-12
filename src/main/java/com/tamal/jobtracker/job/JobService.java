package com.tamal.jobtracker.job;
import com.tamal.jobtracker.dashboard.DashboardStats;
import com.tamal.jobtracker.exception.InvalidCredentialsException;
import com.tamal.jobtracker.exception.UserNotFoundException;
import com.tamal.jobtracker.exception.JobNotFoundException;
import com.tamal.jobtracker.history.JobStatusHistory;
import com.tamal.jobtracker.history.JobStatusHistoryRepository;
import com.tamal.jobtracker.reminder.ReminderRepository;
import com.tamal.jobtracker.storage.FileStorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.tamal.jobtracker.user.User;
import com.tamal.jobtracker.user.UserRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import java.nio.file.Files;
import java.nio.file.Path;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobStatusHistoryRepository jobStatusHistoryRepository;

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public Job addJob(Long userId,Job job) {

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        job.setUser(user);
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));
    }

    public Job updateJob(Long id, Job updatedJob, String email) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new InvalidCredentialsException("You cannot modify this job");
        }

        String oldStatus = job.getStatus();

        job.setCompany(updatedJob.getCompany());
        job.setPosition(updatedJob.getPosition());
        job.setStatus(updatedJob.getStatus());
        job.setLocation(updatedJob.getLocation());
        job.setJobLink(updatedJob.getJobLink());

        if (!oldStatus.equals(updatedJob.getStatus())) {

            JobStatusHistory history = new JobStatusHistory();

            history.setStatus(updatedJob.getStatus());
            history.setChangedAt(LocalDateTime.now());
            history.setJob(job);

            jobStatusHistoryRepository.save(history);
        }

        return jobRepository.save(job);
    }

    @Transactional
    public void deleteJob(Long id, String email) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new InvalidCredentialsException("You cannot delete this job");
        }

        // 1. Delete associated reminders
        reminderRepository.deleteByJobId(id);

        // 2. Delete associated job status history
        jobStatusHistoryRepository.deleteByJobId(id);

        // 3. Delete resume file if uploaded
        if (job.getResumeFileName() != null && !job.getResumeFileName().isEmpty()) {
            fileStorageService.deleteFile(job.getResumeFileName());
        }

        // 4. Delete job record
        jobRepository.delete(job);
    }

    public List<Job>getJobsByUserId(Long userId) {
        return jobRepository.findByUserId(userId);
    }
    public List<Job> getJobsByUserAndStatus(Long userId, String status) {
        return jobRepository.findJobsByUserAndStatus(userId, status);
    }
    public List<Job>searchByCompany(String company) {
        return jobRepository.findByCompanyIgnoreCase(company);
    }
    public List<Job> searchByUserAndCompany(Long userId, String company) {
            return jobRepository.findByUserIdAndCompanyIgnoreCase(userId, company);
    }
    public Page<Job>getJobs(Pageable pageable){
        return jobRepository.findAll(pageable);
    }

    public List<Job> getJobsByUserEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return jobRepository.findByUserId(user.getId());
    }
    public Job addJobByEmail(String email, Job job) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        job.setUser(user);
        job.setAppliedDate(LocalDate.now());


        Job savedJob = jobRepository.save(job);

        JobStatusHistory history = new JobStatusHistory();
        history.setStatus(savedJob.getStatus());
        history.setChangedAt(LocalDateTime.now());
        history.setJob(savedJob);

        jobStatusHistoryRepository.save(history);

        return jobRepository.save(job);
    }

    public List<JobStatusHistory> getJobStatusHistory(Long jobId, String email) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new InvalidCredentialsException(
                    "You cannot view this job history"
            );
        }

        return jobStatusHistoryRepository
                .findByJobIdOrderByChangedAtAsc(jobId);
    }
    public DashboardStats getDashboardStats(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Long userId = user.getId();

        List<Job> jobs = jobRepository.findByUserId(userId);

        long total = jobs.size();

        long applied = jobs.stream()
                .filter(job -> "Applied".equalsIgnoreCase(job.getStatus()))
                .count();

        long interview = jobs.stream()
                .filter(job -> "Interview".equalsIgnoreCase(job.getStatus()))
                .count();

        long rejected = jobs.stream()
                .filter(job -> "Rejected".equalsIgnoreCase(job.getStatus()))
                .count();

        long selected = jobs.stream()
                .filter(job -> "Selected".equalsIgnoreCase(job.getStatus()))
                .count();

        return new DashboardStats(
                total,
                applied,
                interview,
                rejected,
                selected
        );
    }
    public void saveResume(
            Long jobId,
            String email,
            String fileName,
            String filePath) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new JobNotFoundException("Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new InvalidCredentialsException(
                    "You cannot modify this job");
        }

        job.setResumeFileName(fileName);
        job.setResumeFilePath(filePath);

        jobRepository.save(job);
    }
    public Job getJobForUser(Long jobId, String email) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new JobNotFoundException("Job not found"));

        if (!job.getUser().getEmail().equals(email)) {
            throw new InvalidCredentialsException(
                    "You cannot access this resume");
        }

        return job;
    }
    public Resource getResumeForUser(Long jobId, String email) {

        Job job = getJobForUser(jobId, email);

        if (job.getResumeFilePath() == null) {
            throw new RuntimeException("No resume uploaded for this job");
        }

        Path path = Path.of(job.getResumeFilePath());

        if (!Files.exists(path)) {
            throw new RuntimeException("Resume file not found");
        }

        return new FileSystemResource(path);
    }

}