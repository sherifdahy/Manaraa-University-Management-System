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
        services.AddScoped<IUnitOfWork, UnitOfWork>();
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
        var connetionString = configuration.GetConnectionString("default")
                ?? throw new InvalidOperationException("Connetion String Not Found");

        services.AddDbContext<ApplicationDbContext>(x =>
        {
            x.UseSqlServer(connetionString);
        });
    }
    
}
