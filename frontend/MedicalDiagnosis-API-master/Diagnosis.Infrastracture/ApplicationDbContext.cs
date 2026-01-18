using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Diagnosis.Domain.Entites;
using Diagnosis.Domain.Models.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Diagnostics;
public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Patient> Patients { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Faq> Faqs { get; set; }
    public DbSet<SupportTicket> SupportTickets { get; set; }
    public DbSet<Inquiry> Inquiries { get; set; }
    public DbSet<BoneFraction> BoneFractions { get; set; }
    public DbSet<DoctorDiagnosis> Diagnosises { get; set; }
    public DbSet<Symptom> Symptoms { get; set; }
    public DbSet<ClinicalFinding> ClinicalFindings { get; set; }
    public DbSet<SuggestedMedication> SuggestedMedications { get; set; }
    public DbSet<Request> Requests { get; set; }
    public DbSet<UserAIUsage> Usages { get; set; }
    public DbSet<UsageConfig> UsageConfig { get; set; }
    public DbSet<UserSettings> UserSettings { get; set; }
    public DbSet<PhysiotherapyExercise> PhysiotherapyExercises { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply configurations
        modelBuilder.ApplyConfiguration(new PatientConfiguration());
        modelBuilder.ApplyConfiguration(new DoctorConfiguration());
        modelBuilder.ApplyConfiguration(new PaymentConfiguration());
        modelBuilder.ApplyConfiguration(new LabResultConfiguration());
        modelBuilder.ApplyConfiguration(new NotificationConfiguration());

        modelBuilder.Entity<ApplicationUser>()
        .HasOne(u => u.Doctor)
        .WithOne(d => d.User)
        .HasForeignKey<Doctor>(d => d.UserId)
        .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ApplicationUser>()
            .HasOne(u => u.Patient)
            .WithOne(p => p.User)
            .HasForeignKey<Patient>(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ApplicationUser>()
            .HasOne(u => u.Usage)
            .WithOne(p => p.User)
            .HasForeignKey<UserAIUsage>(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ApplicationUser>()
          .HasMany(u => u.SupportTickets)
          .WithOne(p => p.User)
          .HasForeignKey(p => p.userId)
          .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<ApplicationUser>()
            .HasMany(u => u.Notifications)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Inquiry>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");


        modelBuilder.Entity<BoneFraction>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<Doctor>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<MedicalFiles>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<Notification>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<Patient>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");

        modelBuilder.Entity<Payment>()
            .Property(p => p.CreatedOn)
            .HasDefaultValueSql("GETUTCDATE()");


        modelBuilder.Entity<Inquiry>()
            .Property(c => c.Status)
            .HasConversion<string>();


        modelBuilder.Entity<Notification>()
            .Property(p => p.NotificationType)
            .HasConversion<string>();

        modelBuilder.Entity<MedicalFiles>()
            .Property(p => p.Type)
            .HasConversion<string>();

        modelBuilder.Entity<Request>()
        .Property(p => p.Status)
        .HasConversion<string>();

        modelBuilder.Entity<Faq>()
            .Property(p => p.Type)
            .HasConversion<string>();

        modelBuilder.Entity<DoctorDiagnosis>(d =>
        {
            d.HasMany(c => c.Symptoms)
            .WithOne(c => c.Diagnosis)
            .HasForeignKey(c => c.DiagnosisId)
            .OnDelete(DeleteBehavior.NoAction);

            d.HasMany(d => d.SuggestedMedications)
            .WithOne(c => c.Diagnosis)
            .HasForeignKey(c => c.DiagnosisId)
            .OnDelete(DeleteBehavior.NoAction);

            d.HasMany(d => d.ClinicalFindings)
            .WithOne(c => c.Diagnosis)
            .HasForeignKey(d => d.DiagnosisId)
            .OnDelete(DeleteBehavior.NoAction);
        });


        // ================== 1 ====================
        modelBuilder.Entity<DoctorDiagnosis>().HasData(
            new DoctorDiagnosis
            {
                Id = 1,
                Title = "Cold & Flu",
                Name = "Upper Respiratory Infection",
                Description = "Viral infection affecting upper respiratory tract",
                PatientSymptoms = "Fever, cough, sore throat, runny nose"
            }
            );

        modelBuilder.Entity<Symptom>().HasData(
            new Symptom { Id = 1, Name = "Fever", DiagnosisId = 1 },
            new Symptom { Id = 2, Name = "Cough", DiagnosisId = 1 },
            new Symptom { Id = 3, Name = "Sore throat", DiagnosisId = 1 },
            new Symptom { Id = 4, Name = "Runny nose", DiagnosisId = 1 },
            new Symptom { Id = 5, Name = "Body aches", DiagnosisId = 1 }
        );

        modelBuilder.Entity<ClinicalFinding>().HasData(

            new ClinicalFinding { Id = 1, Name = "Body Temperature", Value = "38.5°C", Notes = "Fever", DiagnosisId = 1 },
            new ClinicalFinding { Id = 2, Name = "Oxygen Saturation", Value = "98%", Notes = "Normal", DiagnosisId = 1 }

        );

        modelBuilder.Entity<SuggestedMedication>().HasData(
            new SuggestedMedication
            {
                Id = 1,
                Name = "Paracetamol",
                Dosage = "500 mg",
                Frequency = "Every 8 hours",
                DiagnosisId = 1
            },
            new SuggestedMedication
            {
                Id = 2,
                Name = "Antihistamine",
                Dosage = "10 mg",
                Frequency = "Once daily",
                DiagnosisId = 1
            }

        );

        //============== 2 ================

        modelBuilder.Entity<DoctorDiagnosis>().HasData(
            new DoctorDiagnosis
            {
                Id = 2,
                Title = "Stomach Pain",
                Name = "Gastritis",
                Description = "Inflammation of stomach lining",
                PatientSymptoms = "Abdominal pain, nausea, vomiting"
            }
         );

        modelBuilder.Entity<Symptom>().HasData(
            new Symptom { Id = 6, Name = "Abdominal pain", DiagnosisId = 2 },
            new Symptom { Id = 7, Name = "Nausea", DiagnosisId = 2 },
            new Symptom { Id = 8, Name = "Vomiting", DiagnosisId = 2 },
            new Symptom { Id = 9, Name = "Bloating", DiagnosisId = 2 }

        );

        modelBuilder.Entity<ClinicalFinding>().HasData(

           new ClinicalFinding { Id = 3, Name = "Abdominal tenderness", Value = "Present", Notes = "Epigastric area", DiagnosisId = 2 }
        );

        modelBuilder.Entity<SuggestedMedication>().HasData(
            new SuggestedMedication
            {
                Id = 3,
                Name = "Omeprazole",
                Dosage = "20 mg",
                Frequency = "Once daily before meals",
                DiagnosisId = 2
            },
            new SuggestedMedication
            {
                Id = 4,
                Name = "Antacid",
                Dosage = "10 ml",
                Frequency = "After meals",
                DiagnosisId = 2
            }
        );


        // =============== 3 ===============

        modelBuilder.Entity<DoctorDiagnosis>().HasData(
            new DoctorDiagnosis
            {
                Id = 3,
                Title = "Hypertension",
                Name = "High Blood Pressure",
                Description = "Chronic elevation of blood pressure",
                PatientSymptoms = "Headache, dizziness, blurred vision"
            }

         );

        modelBuilder.Entity<Symptom>().HasData(
            new Symptom { Id = 10, Name = "Headache", DiagnosisId = 3 },
            new Symptom { Id = 11, Name = "Dizziness", DiagnosisId = 3 },
            new Symptom { Id = 12, Name = "Blurred vision", DiagnosisId = 3 }
        );

        modelBuilder.Entity<ClinicalFinding>().HasData(

            new ClinicalFinding
            {
                Id = 4,
                Name = "Blood Pressure",
                Value = "150/95 mmHg",
                Notes = "Elevated",
                DiagnosisId = 3
            }
        );

        modelBuilder.Entity<SuggestedMedication>().HasData(
            new SuggestedMedication
            {
                Id = 5,
                Name = "Amlodipine",
                Dosage = "5 mg",
                Frequency = "Once daily",
                DiagnosisId = 3
            },
            new SuggestedMedication
            {
                Id = 6,
                Name = "Lifestyle modification",
                Dosage = "-",
                Frequency = "Low salt diet & exercise",
                DiagnosisId = 3
            }
        );

        // ================= 4 =================

        modelBuilder.Entity<DoctorDiagnosis>().HasData(
            new DoctorDiagnosis
            {
                Id = 4,
                Title = "Diabetes Follow-up",
                Name = "Type 2 Diabetes Mellitus",
                Description = "Routine diabetes follow-up and monitoring",
                PatientSymptoms = "Fatigue, frequent urination"
            }

         );

        modelBuilder.Entity<Symptom>().HasData(
        new Symptom { Id = 13, Name = "Fatigue", DiagnosisId = 4 },
        new Symptom { Id = 14, Name = "Frequent urination", DiagnosisId = 4 }

        );

        modelBuilder.Entity<ClinicalFinding>().HasData(
            new ClinicalFinding
            {
                Id = 5,
                Name = "HbA1c",
                Value = "7.1%",
                Notes = "Above target",
                DiagnosisId = 4
            },
            new ClinicalFinding
            {
                Id = 6,
                Name = "Fasting Blood Glucose",
                Value = "140 mg/dL",
                Notes = "Elevated",
                DiagnosisId = 4
            }

        );

        modelBuilder.Entity<SuggestedMedication>().HasData(
            new SuggestedMedication
            {
                Id = 7,
                Name = "Metformin",
                Dosage = "500 mg",
                Frequency = "Twice daily",
                DiagnosisId = 4
            }
        );


        // ----------------------
        // Identity Roles
        // ----------------------
        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole { Id = "role-admin", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "role-doctor", Name = "Doctor", NormalizedName = "DOCTOR" },
            new IdentityRole { Id = "role-patient", Name = "Patient", NormalizedName = "PATIENT" }
        );

        // ----------------------
        // Users
        // ----------------------
        modelBuilder.Entity<ApplicationUser>().HasData(
            new ApplicationUser
            {
                Id = "user-0",
                UserName = "admin@diagnosis.com",
                NormalizedUserName = "ADMIN@DIAGNOSIS.COM",
                Email = "admin@diagnosis.com",
                NormalizedEmail = "ADMIN@DIAGNOSIS.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                PasswordHash = ""
            },
            new ApplicationUser
            {
                Id = "user-1",
                UserName = "doctor@test.com",
                NormalizedUserName = "DOCTOR@TEST.COM",
                Email = "doctor@test.com",
                NormalizedEmail = "DOCTOR@TEST.COM",
                EmailConfirmed = true,
                SecurityStamp = "stamp1",
                PasswordHash = ""
            },
            new ApplicationUser
            {
                Id = "user-2",
                UserName = "patient@test.com",
                NormalizedUserName = "PATIENT@TEST.COM",
                Email = "patient@test.com",
                NormalizedEmail = "PATIENT@TEST.COM",
                EmailConfirmed = true,
                SecurityStamp = "stamp2",
                PasswordHash = ""
            }
        );

        // ----------------------
        // Doctor
        // ----------------------
        modelBuilder.Entity<Doctor>().HasData(
            new Doctor
            {
                Id = -1,
                UserId = "user-1",
                FName = "Ahmed",
                LName = "Mahmoud",
                Specialization = "Dermatology",
                ExperienceYears = 8,
                Rating = 4.7m,
                ProfileImageUrl = "",
                ModifiedOn = null,
                IsDeleted = false
            }
        );

        // ----------------------
        // Patient
        // ----------------------
        modelBuilder.Entity<Patient>().HasData(
            new Patient
            {
                Id = -1,
                UserId = "user-2",
                FName = "Sara",
                LName = "Ali",
                DateOfBirth = new DateTime(1996, 6, 15),
                Gender = "Female",
                Address = "Cairo",
                BloodType = "A+",
                Allergies = "None",
                ProfileImageUrl = "",
                IsNewPatient = true,
                IsUrgent = false,
                ModifiedOn = null,
                IsDeleted = false
            }
        );


        // ----------------------
        // Payment
        // ----------------------
        modelBuilder.Entity<Payment>().HasData(
            new Payment
            {
                Id = -1,
                DoctorId = -1,
                AppointmentId = -1,
                Amount = 300,
                PaymentMethod = "Cash",
                PaymentStatus = "Paid",
                Notes = "",
                ModifiedOn = null,
                IsDeleted = false
            }
        );


        // ----------------------
        // Notification
        // ----------------------
        modelBuilder.Entity<Notification>().HasData(
            new Notification
            {
                Id = -1,
                UserId = "user-2",
                UserType = "Patient",
                Title = "Appointment Confirmed",
                Message = "Your appointment is confirmed.",
                NotificationType = "Appointment",
                IsRead = false,
                RelatedId = -1,
                RelatedType = "Appointment",
                ReadAt = null,
                ModifiedOn = null,
                IsDeleted = false
            }
        );


        // ----------------------
        // Consultation
        // ----------------------
        modelBuilder.Entity<Inquiry>().HasData(
            new Inquiry
            {
                Id = 1,
                PatientId = -1,
                DoctorId = -1,
                Symptoms = "Headache, fever, and fatigue.",
                Notes = "Patient reports symptoms for 3 days.",
                Status = ConsultationStatus.Pending,
                Type = ConsultationType.Inquiry,
                Date = new DateTime(2025, 1, 1),
                ConfidenceLevel = "60%",
                //Description = "General inquiry about symptoms"
            }
        );

     
        // --------------------
        // Faq
        // --------------------

        modelBuilder.Entity<Faq>().HasData(
        new Faq
        {
            Id = 1,
            Type = FaqType.Patient,
            Question = "How can I book an appointment?",
            Answer = "You can book an appointment through the mobile application."
        },
        new Faq
        {
            Id = 2,
            Type = FaqType.Patient,
            Question = "Can I cancel or reschedule my appointment?",
            Answer = "Yes, you can cancel or reschedule your appointment from your profile."
        },
        new Faq
        {
            Id = 3,
            Type = FaqType.Patient,
            Question = "How do I view my medical history?",
            Answer = "Your medical history is available in the medical records section."
        },
        new Faq
        {
            Id = 4,
            Type = FaqType.Patient,
            Question = "Is my personal data secure?",
            Answer = "Yes, all your data is securely stored and protected."
        },

    // Doctor FAQs
        new Faq
        {
            Id = 5,
            Type = FaqType.Doctor,
            Question = "How can I manage my appointments?",
            Answer = "You can manage your appointments from the doctor dashboard."
        },
        new Faq
        {
            Id = 6,
            Type = FaqType.Doctor,
            Question = "How do I update my availability?",
            Answer = "You can update your availability from your profile settings."
        },
        new Faq
        {
            Id = 7,
            Type = FaqType.Doctor,
            Question = "Can I access patient medical records?",
            Answer = "Yes, you can access medical records for patients assigned to you."
        },
        new Faq
        {
            Id = 8,
            Type = FaqType.Doctor,
            Question = "How do I receive payments?",
            Answer = "Payments are transferred to your registered bank account."
        }
        );  

        modelBuilder.Entity<PhysiotherapyExercise>().HasData(

        // 🔹 BACK
        new PhysiotherapyExercise
        {
            Id = 1,
            Title = "Back Stretch Exercise",
            BodyPart = "Back",
            Difficulty = "Easy",
            DurationMinutes = 4,
            YoutubeUrl = "https://www.youtube.com/watch?v=4BOTvaRaDjI",
            ThumbnailUrl = "https://img.youtube.com/vi/4BOTvaRaDjI/hqdefault.jpg"
        },
        new PhysiotherapyExercise
        {
            Id = 2,
            Title = "Lower Back Mobility Routine",
            BodyPart = "Back",
            Difficulty = "Easy",
            DurationMinutes = 6,
            YoutubeUrl = "https://www.youtube.com/watch?v=DWmGArQBtFI",
            ThumbnailUrl = "https://img.youtube.com/vi/DWmGArQBtFI/hqdefault.jpg"
        },

        // 🔹 SHOULDER
        new PhysiotherapyExercise
        {
            Id = 3,
            Title = "Shoulder Strengthening Exercise",
            BodyPart = "Shoulder",
            Difficulty = "Medium",
            DurationMinutes = 5,
            YoutubeUrl = "https://www.youtube.com/watch?v=1g6L2HkZz9Y",
            ThumbnailUrl = "https://img.youtube.com/vi/1g6L2HkZz9Y/hqdefault.jpg"
        },
        new PhysiotherapyExercise
        {
            Id = 4,
            Title = "Rotator Cuff Rehab Exercise",
            BodyPart = "Shoulder",
            Difficulty = "Medium",
            DurationMinutes = 7,
            YoutubeUrl = "https://www.youtube.com/watch?v=PPzD2w6pXyE",
            ThumbnailUrl = "https://img.youtube.com/vi/PPzD2w6pXyE/hqdefault.jpg"
        },

        // 🔹 LEGS
        new PhysiotherapyExercise
        {
            Id = 5,
            Title = "Leg Balance Exercise",
            BodyPart = "Legs",
            Difficulty = "Hard",
            DurationMinutes = 6,
            YoutubeUrl = "https://www.youtube.com/watch?v=Z8nQXn1pXyE",
            ThumbnailUrl = "https://img.youtube.com/vi/Z8nQXn1pXyE/hqdefault.jpg"
        },
        new PhysiotherapyExercise
        {
            Id = 6,
            Title = "Knee Stability Exercise",
            BodyPart = "Legs",
            Difficulty = "Medium",
            DurationMinutes = 5,
            YoutubeUrl = "https://www.youtube.com/watch?v=R1rYz6k2KpU",
            ThumbnailUrl = "https://img.youtube.com/vi/R1rYz6k2KpU/hqdefault.jpg"
        }
    );
    }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.ConfigureWarnings(w =>
         w.Ignore(RelationalEventId.PendingModelChangesWarning));

    }
}