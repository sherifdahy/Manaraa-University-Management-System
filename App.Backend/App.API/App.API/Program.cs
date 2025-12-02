using App.API;
using Hangfire;
using App.Infrastructure.Presistance.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.AddDepenecyInjectionRegistration();

var app = builder.Build();

app.MapOpenApi();
app.MapScalarApiReference(options =>
{
    options.AddPreferredSecuritySchemes("Bearer");
});

app.UseSerilogRequestLogging();

app.UseHttpsRedirection();

app.UseHangfireDashboard("/jobs");

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseExceptionHandler();

app.Run();
