package com.tamal.jobtracker.job;

import com.tamal.jobtracker.storage.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

@RestController
@RequestMapping("/api/jobs")
public class ResumeController {

    @Autowired
    private JobService jobService;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/{jobId}/resume")
    public String uploadResume(
            @PathVariable Long jobId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        String email = authentication.getName();

        String filePath = fileStorageService.saveFile(file);

        jobService.saveResume(
                jobId,
                email,
                file.getOriginalFilename(),
                filePath
        );

        return "Resume uploaded successfully";
    }
    @GetMapping("/{jobId}/resume")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long jobId,
            Authentication authentication) {

        String email = authentication.getName();

        Job job = jobService.getJobForUser(jobId, email);

        Resource resource = new FileSystemResource(job.getResumeFilePath());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + job.getResumeFileName() + "\""
                )
                .body(resource);
    }
}