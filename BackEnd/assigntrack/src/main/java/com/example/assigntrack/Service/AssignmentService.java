package com.example.assigntrack.Service;

import com.example.assigntrack.Entity.*;
import com.example.assigntrack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Assignment addAssignment(Long userId, Assignment assignment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        assignment.setUser(user);
        assignment.setStatus("PENDING");
        return assignmentRepository.save(assignment);
    }

    public Assignment markSubmitted(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setStatus("SUBMITTED");
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getUserAssignments(Long userId) {
        return assignmentRepository.findByUserId(userId);
    }

    public List<Assignment> getOverdueAssignments(Long userId) {
        return assignmentRepository
                .findByUserIdAndDueDateBeforeAndStatus(userId, LocalDate.now(), "PENDING");
    }

    public Map<String, Long> getStats(Long userId) {
        List<Assignment> all = assignmentRepository.findByUserId(userId);
        long total = all.size();
        long submitted = all.stream().filter(a -> a.getStatus().equals("SUBMITTED")).count();
        long pending = total - submitted;

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("submitted", submitted);
        stats.put("pending", pending);
        return stats;
    }
}