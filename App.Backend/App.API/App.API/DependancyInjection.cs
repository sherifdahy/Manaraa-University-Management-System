using App.Application;
using App.Application.Filters;
using App.Core.Interfaces;
using App.Infrastructure;
using App.Infrastructure.Authentications;
using App.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;

namespace App.API;

public static class DependancyInjection
{
    public static void AddDepenecyInjectionRegistration(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationRegistrations();
        builder.Services.AddInfrastructureRegistrations(builder.Configuration);
        builder.Services.AddServicesRegistration();
        builder.Services.AddServicesConfig();
        builder.Services.AddCorsConfig(builder.Configuration);
        builder.AddSeriLogConfig();
        builder.Services.AddOptionPatternsConfig(builder.Configuration);
        builder.Services.AddAuthConfig(builder.Configuration);
    }
    private static void AddSeriLogConfig(this WebApplicationBuilder builder)
    {
        builder.Host.UseSerilog((context, configuration) =>
        {
            configuration.ReadFrom.Configuration(context.Configuration);
        });
    }
    private static IServiceCollection AddServicesConfig(this IServiceCollection services)
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();

        services.AddProblemDetails();

        return services;
    }
    private static IServiceCollection AddAuthConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IJwtProvider, JwtProvider>();

        services.AddOptions<JwtOptions>()
            .BindConfiguration("Jwt")
            .ValidateDataAnnotations()
            .ValidateOnStart();

        var jwtSettings = configuration.GetSection("Jwt").Get<JwtOptions>();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            o.SaveToken = true;
            // validation 
            o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateActor = true,
                ValidateLifetime = true,

                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings!.Key)),
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
            };
        });

        services.AddTransient<IAuthorizationHandler, PermissionAuthorizationHandler>();
        services.AddTransient<IAuthorizationPolicyProvider, PermissionAuthorizationPolicyProvider>();

        return services;
    }
    private static IServiceCollection AddCorsConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.WithOrigins(configuration.GetSection("AllowedOrigins").Get<string[]>()!);
            });
        });
        return services;
    }
    private static IServiceCollection AddOptionPatternsConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddOptions<JwtOptions>()
            .BindConfiguration(JwtOptions.SectionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        return services;
    }
}
