using App.Core.Interfaces;
using App.Infrastructure.Authentications;
using App.Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SA.Accountring.Core.Entities.Interfaces;
using System.Text;

namespace App.Infrastructure;
public static class InfrastructureRegistrations
{
    public static void AddInfrastructureRegistrations(this IServiceCollection services,IConfiguration configuration)
    {
        services.AddDbContextConfig(configuration);
        services.AddIdentityConfig();
        services.AddJwtConfig(configuration);
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddSingleton<IJwtProvider, JwtProvider>();
    }

    private static void AddIdentityConfig(this IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequiredLength = 8;
            //options.SignIn.RequireConfirmedEmail = true;
            options.User.RequireUniqueEmail = true;
        });
    }

    private static void AddDbContextConfig(this IServiceCollection services,IConfiguration configuration)
    {
        var connetionString = configuration.GetConnectionString("omarlocal")
                ?? throw new InvalidOperationException("Connetion String Not Found");

        services.AddDbContext<ApplicationDbContext>(x =>
        {
            x.UseSqlServer(connetionString);
        });
    }
    private static IServiceCollection AddJwtConfig(this IServiceCollection services, IConfiguration configuration)
    {

        var jwtSettings = configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(o =>
        {
            o.SaveToken = true;
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings?.Key!)),
                ValidIssuer = jwtSettings?.Issuer,
                ValidAudience = jwtSettings?.Audience
            };
        });
        return services;
    }
}
