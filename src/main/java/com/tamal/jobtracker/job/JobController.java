package com.tamal.jobtracker.job;
import com.tamal.jobtracker.dashboard.DashboardStats;

import com.tamal.jobtracker.exception.UserNotFoundException;
import com.tamal.jobtracker.history.JobStatusHistory;
import com.tamal.jobtracker.user.User;
import com.tamal.jobtracker.user.UserRepository;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;
    @Autowired
    private JobRepository jobRepository;

    @PostMapping
    public Job addJob(Authentication authentication,
                      @Valid @RequestBody Job job) {

        String email = authentication.getName();

        return jobService.addJobByEmail(email, job);
    }
    @GetMapping
    public List<Job> getAllJobs(Authentication authentication) {
        String email = authentication.getName();
        return jobService.getJobsByUserEmail(email);
    }
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job,Authentication authentication) {
        String email = authentication.getName();
        return jobService.updateJob(id, job,email);
    }
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id,Authentication authentication) {
        String email = authentication.getName();
        jobService.deleteJob(id,email);
        return "Job Deleted successfully";
    }
    @GetMapping("/user/{userId}")
    public List<Job>getJobsByUserId(@PathVariable Long userId) {
        return jobService.getJobsByUserId(userId);
    }
    @GetMapping("/user/{userId}/status/{status}")
    public List<Job>getJobsByUserIdAndStatus(@PathVariable Long userId, @PathVariable String status) {
        return jobService.getJobsByUserAndStatus(userId, status);
    }
    @GetMapping("/search")
    public List<Job> searchByCompany(@RequestParam String company) {
        return jobService.searchByCompany(company);
    }
    @GetMapping("/user/{userId}/search")
    public List<Job>searchByUserAndCompany(@PathVariable Long userId, @RequestParam String company) {
        return jobService.searchByUserAndCompany(userId, company);
    }

    @GetMapping("/page")
    public Page<Job>getJobs(Pageable pageable) {
        return jobService.getJobs(pageable);
    }

    @GetMapping("/{id}/history")
    public List<JobStatusHistory> getJobStatusHistory(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return jobService.getJobStatusHistory(id, email);
    }
    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats(Authentication authentication) {
        String email = authentication.getName();
        return jobService.getDashboardStats(email);
    }


}
