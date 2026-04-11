using backend_dotnet.Data;
using backend_dotnet.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// connection string z Azure App Service
var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? builder.Configuration["DbConnectionString"];

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
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

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

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