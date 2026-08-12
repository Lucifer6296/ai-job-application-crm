package com.tamal.jobtracker.reminder;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    public ReminderService reminderService;

    @PostMapping("/job/{jobId}")
    public Reminder createReminder(@PathVariable Long jobId,
                                   @RequestBody Reminder reminder,
                                   Authentication authentication){
        String email = authentication.getName();
        return reminderService.createReminder(jobId, email, reminder);
    }
    @GetMapping("/job/{jobId}")
    public List<Reminder> getReminders(@PathVariable Long jobId,Authentication authentication){
        String email = authentication.getName();
        return reminderService.getReminders(jobId, email);
    }
    @PatchMapping("/{id}/complete")
    public Reminder completeReminder(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return reminderService.completeReminder(id, email);
    }
    @GetMapping
    public List<Reminder> getAllReminders(Authentication authentication) {

        String email = authentication.getName();

        return reminderService.getAllReminders(email);
    }

    @DeleteMapping("/{id}")
    public String deleteReminder(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        reminderService.deleteReminder(id, email);
        return "Reminder deleted successfully";
    }

}

