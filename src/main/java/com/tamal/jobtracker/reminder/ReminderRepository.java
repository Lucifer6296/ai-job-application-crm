package com.tamal.jobtracker.reminder;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByJobId(Long jobId);

    List<Reminder> findByCompletedFalse();

    List<Reminder> findByCompletedFalseAndReminderTimeLessThanEqual(
            LocalDateTime time
    );
    List<Reminder> findByCompletedFalseAndEmailSentFalseAndReminderTimeLessThanEqual(
            LocalDateTime time

    );
    List<Reminder> findByJobUserId(Long userId);

    void deleteByJobId(Long jobId);
}