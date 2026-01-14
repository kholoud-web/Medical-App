    using Diagnosis.Domain.Entites;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class PatientConfiguration : IEntityTypeConfiguration <Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.HasKey(p => p.Id);

        

            builder.HasMany(p => p.Inquiries)
                   .WithOne(a => a.Patient)
                   .HasForeignKey(a => a.PatientId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(p => p.BoneFractures)
                   .WithOne(a => a.Patient)
                   .HasForeignKey(a => a.PatientId)
                   .OnDelete(DeleteBehavior.NoAction);

        // One-to-Many: Patient -> LabResults
        builder.HasMany(p => p.Files)
                   .WithOne(l => l.Patient)
                   .HasForeignKey(l => l.PatientId)
                   .OnDelete(DeleteBehavior.NoAction);

          
    }
    }

    public class DoctorConfiguration : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.HasKey(d => d.Id);

            builder.HasMany(d => d.Inquiries)
                   .WithOne(a => a.Doctor)
                   .HasForeignKey(a => a.DoctorId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(d => d.BoneFractures)
                   .WithOne(a => a.Doctor)
                   .HasForeignKey(a => a.DoctorId)
                   .OnDelete(DeleteBehavior.NoAction);

        // One-to-Many: Doctor -> Payments
        builder.HasMany(d => d.Payments)
                   .WithOne(p => p.Doctor)
                   .HasForeignKey(p => p.DoctorId)
                   .OnDelete(DeleteBehavior.NoAction);


    }
    }

    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(p => p.Id);
            builder.HasIndex(p => p.PaymentDate)
                   .HasDatabaseName("idx_payment_date");
        }
    }


    public class LabResultConfiguration : IEntityTypeConfiguration<MedicalFiles>
    {
        public void Configure(EntityTypeBuilder<MedicalFiles> builder)
        {
            builder.HasKey(l => l.Id);
        }
    }


    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.HasKey(n => n.Id);

            // Indexes
            builder.HasIndex(n => new { n.UserId, n.IsRead })
                   .HasDatabaseName("idx_user_unread");
            builder.HasIndex(n => n.CreatedOn)
                   .HasDatabaseName("idx_created_at");
        }
    }
