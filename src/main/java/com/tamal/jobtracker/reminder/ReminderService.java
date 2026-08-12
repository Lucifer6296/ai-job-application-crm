package com.tamal.jobtracker.reminder;

import com.tamal.jobtracker.job.Job;
import com.tamal.jobtracker.job.JobRepository;
import com.tamal.jobtracker.user.User;
import com.tamal.jobtracker.exception.UserNotFoundException;
import com.tamal.jobtracker.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public Reminder createReminder(
            Long jobId,
            String email,
            Reminder reminder) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!job.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You cannot create a reminder for this job");
        }

        reminder.setJob(job);

        return reminderRepository.save(reminder);
    }

    public List<Reminder> getReminders(Long jobId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!job.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You cannot view reminders for this job");
        }

        return reminderRepository.findByJobId(jobId);
    }
    public Reminder completeReminder(Long reminderId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() ->
                        new RuntimeException("Reminder not found"));

        if (!reminder.getJob().getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "You cannot modify this reminder");
        }

        reminder.setCompleted(true);

        return reminderRepository.save(reminder);
    }
    public List<Reminder> getAllReminders(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        return reminderRepository.findByJobUserId(user.getId());
    }

    public void deleteReminder(Long reminderId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Reminder reminder = reminderRepository.findById(reminderId)
                .orElseThrow(() ->
                        new RuntimeException("Reminder not found"));

        if (!reminder.getJob().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot delete this reminder");
        }

        reminderRepository.delete(reminder);
    }
}