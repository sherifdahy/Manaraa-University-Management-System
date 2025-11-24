using App.Application;
using App.Infrastructure;
using App.Infrastructure.Authentications;
using App.Services;
using Serilog;

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
