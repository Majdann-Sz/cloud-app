using backend_dotnet.Data;
using backend_dotnet.Models;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;

var builder = WebApplication.CreateBuilder(args);

// ===== Azure Key Vault =====
// builder.Configuration.AddAzureKeyVault(
//     new Uri("https://tasks-keyvault-wrx86301.vault.azure.net/"),
//     new DefaultAzureCredential()
// );

// ===== Connection string z Key Vault =====
var connectionString = builder.Configuration["DbConnectionString"];

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// ===== Swagger =====
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===== CORS dla frontendu Azure =====
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

// GET
app.MapGet("/tasks", async (AppDbContext db) =>
{
    return await db.Tasks.ToListAsync();
});

// POST
app.MapPost("/tasks", async (TaskItem task, AppDbContext db) =>
{
    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    return Results.Created($"/tasks/{task.Id}", task);
});

// DELETE
app.MapDelete("/tasks/{id}", async (int id, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task == null)
        return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();

    return Results.Ok();
});

app.Run();