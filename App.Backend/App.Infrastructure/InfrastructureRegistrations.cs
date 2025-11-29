using App.Infrastructure.Email;
using App.Infrastructure.Repository;
using Microsoft.AspNetCore.Identity.UI.Services;
using SA.Accountring.Core.Entities.Interfaces;

namespace App.Infrastructure;
public static class InfrastructureRegistrations
{
    //TODO 
    //Infrastructure ShouldNot See the configuration it must be In the API LAYER
    public static void AddInfrastructureRegistrations(this IServiceCollection services,IConfiguration configuration)
    {
        services.AddDbContextConfig(configuration);

        services.AddIdentityConfig();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IEmailSender, EmailSender>();

        services.AddOptionPatternConfig(configuration);
    }

    private static void AddIdentityConfig(this IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequiredLength = 8;
            //options.SignIn.RequireConfirmedEmail = true;
            options.User.RequireUniqueEmail = true;
        });
    }

    private static void AddDbContextConfig(this IServiceCollection services,IConfiguration configuration)
    {
        var connetionString = configuration.GetConnectionString("default")
                ?? throw new InvalidOperationException("Connetion String Not Found");

        services.AddDbContext<ApplicationDbContext>(x =>
        {
            x.UseSqlServer(connetionString);
        });
    }

    private static void AddOptionPatternConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<MailSettings>(configuration.GetSection(nameof(MailSettings)));

    }

}
