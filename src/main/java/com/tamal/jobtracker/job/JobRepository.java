package com.tamal.jobtracker.job;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUserId(Long userId);

    @Query(
            value = "SELECT * FROM jobs WHERE user_id = :userId " +
                    "AND LOWER(TRIM(status)) = LOWER(TRIM(:status))",
            nativeQuery = true
    )
    List<Job> findJobsByUserAndStatus(
            @Param("userId") Long userId,
            @Param("status") String status
    );
    List<Job>findByCompanyIgnoreCase(String company);
    List<Job>findByUserIdAndCompanyIgnoreCase( Long userId,  String company);

}