using backend_dotnet.Data;
using backend_dotnet.Models;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;

var builder = WebApplication.CreateBuilder(args);

// ===== Azure Key Vault =====
builder.Configuration.AddAzureKeyVault(
    new Uri("https://tasks-keyvault-wrx86301.vault.azure.net/"),
    new DefaultAzureCredential()
);

// pobranie connection string z Key Vault
var connectionString = builder.Configuration["DbConnectionString"];

// konfiguracja bazy danych
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// ===== Swagger =====
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===== CORS dla frontendu =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// ===== Swagger =====
app.UseSwagger();
app.UseSwaggerUI();

// ===== CORS =====
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();


// ===== ENDPOINTY TASKS =====

// GET /tasks
app.MapGet("/tasks", async (AppDbContext db) =>
{
    return new[] { new { id = 999, title = "AutoDeploy działa 🚀" } };
});

// POST /tasks
app.MapPost("/tasks", async (TaskItem task, AppDbContext db) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    return Results.Created($"/tasks/{task.Id}", task);
});

app.Run();