package com.example.assigntrack.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subject;
    private LocalDate dueDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public LocalDate getDueDate() { return dueDate; }
    public String getStatus() { return status; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setStatus(String status) { this.status = status; }
    public void setUser(User user) { this.user = user; }
}