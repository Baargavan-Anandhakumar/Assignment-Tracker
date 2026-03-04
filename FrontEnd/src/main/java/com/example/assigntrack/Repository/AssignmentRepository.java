package com.example.assigntrack.Repository;

import com.example.assigntrack.Entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByUserId(Long userId);

    List<Assignment> findByUserIdAndDueDateBeforeAndStatus(Long userId, LocalDate date, String status);
}