using App.Infrastructure.Abstractions.Consts;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Infrastructure.Presistance.EntitiesConfiguration;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    private readonly PasswordHasher<ApplicationUser> _passwordHasher = new();
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.OwnsMany(x => x.RefreshTokens)
            .ToTable("RefreshTokens") 
            .WithOwner()
            .HasForeignKey("UserId");

        builder.Property(x => x.FirstName).HasMaxLength(100);

        builder.Property(x => x.LastName).HasMaxLength(100);

        builder.HasData
        (
            new ApplicationUser()
            {
                Id = DefaultUsers.AdminId,
                UserName = DefaultUsers.AdminEmail,
                Email = DefaultUsers.AdminEmail,
                NormalizedEmail = DefaultUsers.AdminEmail.ToUpper(),
                NormalizedUserName = DefaultUsers.AdminEmail.ToUpper(),
                ConcurrencyStamp = DefaultUsers.AdminConcurrencyStamp,
                SecurityStamp = DefaultUsers.AdminSecurityStamp,
                EmailConfirmed = true,
                //PasswordHash = _passwordHasher.HashPassword(null!, DefaultUsers.AdminPassword),
            }   
        );
    }
}
