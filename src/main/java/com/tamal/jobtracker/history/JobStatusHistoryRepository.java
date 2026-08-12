package com.tamal.jobtracker.history;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobStatusHistoryRepository
        extends JpaRepository<JobStatusHistory, Long> {

    List<JobStatusHistory> findByJobIdOrderByChangedAtAsc(Long jobId);

    void deleteByJobId(Long jobId);
}