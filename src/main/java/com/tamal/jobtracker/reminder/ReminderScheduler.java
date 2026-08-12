package com.tamal.jobtracker.reminder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReminderScheduler {

    @Autowired
    private ReminderRepository reminderRepository;

    @Autowired
    private EmailService emailService;

    @Scheduled(fixedRate = 60000)
    public void checkReminders() {

        List<Reminder> reminders =
                reminderRepository
                        .findByCompletedFalseAndEmailSentFalseAndReminderTimeLessThanEqual(
                                LocalDateTime.now()
                        );

        for (Reminder reminder : reminders) {

            String email = reminder.getJob()
                    .getUser()
                    .getEmail();

            String subject =
                    "JobTracker Reminder: " + reminder.getTitle();

            String message =
                    "Reminder: " + reminder.getTitle() + "\n\n" +
                            "Company: " + reminder.getJob().getCompany() + "\n" +
                            "Position: " + reminder.getJob().getPosition() + "\n" +
                            "Reminder Time: " + reminder.getReminderTime();

            try {

                emailService.sendReminderEmail(
                        email,
                        subject,
                        message
                );

                reminder.setEmailSent(true);
                reminderRepository.save(reminder);

                System.out.println(
                        "Reminder email sent to: " + email
                );

            } catch (Exception e) {

                System.out.println(
                        "Failed to send reminder email to: " + email
                );

                e.printStackTrace();
            }
        }
    }

}