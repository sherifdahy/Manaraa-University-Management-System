using App.Core.Entities.University;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Infrastructure.Presistance.EntitiesConfiguration;

public class FacultyConfiguration : IEntityTypeConfiguration<Faculty>
{
    public void Configure(EntityTypeBuilder<Faculty> builder)
    {
        builder.Property(f => f.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(f => f.Description)
            .HasMaxLength(1000);

        builder.Property(f => f.DeanName)
            .HasMaxLength(200);

        builder.Property(f => f.Location)
            .HasMaxLength(200);

        builder.Property(f => f.Email)
            .HasMaxLength(200);

        builder.Property(f => f.Website)
            .HasMaxLength(200);

    }
}
