package com.cdfxlabs.backend.models.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "supabase_uid", nullable = false, unique = true)
    private String supabaseUid;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(nullable = false)
    private String role;

    @Column(name = "user_type")
    private String userType;

    @Column(name = "ai_usage")
    private String aiUsage;

    @Column
    private String state;

    @Column(name = "age_range")
    private String ageRange;

    @Column(name = "creative_field")
    private String creativeField;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}