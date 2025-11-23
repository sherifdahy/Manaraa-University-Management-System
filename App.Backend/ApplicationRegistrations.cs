namespace App.Application;

public static class ApplicationRegistrations
{
    public static void AddApplicationRegistrations(this IServiceCollection services)
    {
        services.AddMediatR(o => o.RegisterServicesFromAssembly(typeof(ApplicationRegistrations).Assembly));
        services
            .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly())
            .AddFluentValidationAutoValidation();
    }
}
