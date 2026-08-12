package com.tamal.jobtracker.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path uploadDir = Paths.get("uploads");

    public FileStorageService() throws IOException {
        Files.createDirectories(uploadDir);
    }

    public String saveFile(MultipartFile file) throws IOException {

        String fileName = System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        Path target = uploadDir.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                target,
                StandardCopyOption.REPLACE_EXISTING
        );

        return target.toString();
    }

    public void deleteFile(String fileName) {
        try {
            Path filePath = uploadDir.resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log but don't throw — file may already be gone
            System.err.println("Warning: could not delete file: " + fileName + " - " + e.getMessage());
        }
    }
}