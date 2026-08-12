package com.tamal.jobtracker.health;

import com.tamal.jobtracker.user.User;
import com.tamal.jobtracker.user.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
public class HealthController {

    private final UserService userService;

    public HealthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/health")
    public String health() {
        return "AI Job Application CRM Backend is Running Successfully ";
    }

}
