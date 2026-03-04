package com.example.assigntrack.Controller;

import com.example.assigntrack.Entity.Assignment;
import com.example.assigntrack.Entity.User;
import com.example.assigntrack.Repository.AssignmentRepository;
import com.example.assigntrack.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/assignments")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add/{userId}")
    public ResponseEntity<Assignment> addAssignment(@PathVariable Long userId,
                                                    @RequestBody Assignment assignment) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + userId));

        assignment.setUser(user);
        assignment.setStatus("Pending");

        Assignment saved = assignmentRepository.save(assignment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/submit/{id}")
    public ResponseEntity<Assignment> markSubmitted(@PathVariable Long id) {
        System.out.println("Submitting assignment with ID: " + id);

        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with ID: " + id));

        assignment.setStatus("Submitted");
        Assignment saved = assignmentRepository.save(assignment);

        System.out.println("Assignment status updated: " + saved.getStatus());
        return ResponseEntity.ok(saved);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Long id) {
        assignmentRepository.deleteById(id);
        return ResponseEntity.ok("Assignment deleted successfully");
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Assignment>> getUserAssignments(@PathVariable Long userId) {
        List<Assignment> assignments = assignmentRepository.findByUserId(userId);
        return ResponseEntity.ok(assignments);
    }


    @GetMapping("/overdue/{userId}")
    public ResponseEntity<List<Assignment>> getOverdueAssignments(@PathVariable Long userId) {
        List<Assignment> assignments = assignmentRepository.findByUserId(userId);
        List<Assignment> overdue = new ArrayList<>();

        for (Assignment a : assignments) {
            if (a.getDueDate().isBefore(LocalDate.now()) && a.getStatus().equals("Pending")) {
                overdue.add(a);
            }
        }

        return ResponseEntity.ok(overdue);
    }


    @GetMapping("/stats/{userId}")
    public ResponseEntity<Map<String, Long>> getStats(@PathVariable Long userId) {
        List<Assignment> assignments = assignmentRepository.findByUserId(userId);

        long total = assignments.size();
        long submitted = assignments.stream().filter(a -> a.getStatus().equals("Submitted")).count();
        long pending = total - submitted;

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("submitted", submitted);
        stats.put("pending", pending);

        return ResponseEntity.ok(stats);
    }
}