package com.tamal.jobtracker.history;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tamal.jobtracker.job.Job;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_status_history")
public class JobStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private LocalDateTime changedAt;

    @ManyToOne
    @JoinColumn(name = "job_id")
    @JsonIgnore
    private Job job;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }
}