# Employee Management System (Angular + .NET Core API)

This project is a **full-stack Employee Management System** built with **Angular (frontend)** and **ASP.NET Core Web API (backend)**.  
It allows users to **add, edit, delete, and view employees** with a clean, responsive UI using Bootstrap.  
The API is integrated directly in the same solution — no separate frontend/backend folders.

---

## Features
- Add, edit, and delete employees.
- Angular UI with Bootstrap styling.
- REST API using ASP.NET Core and Entity Framework Core.
- Loading indicators on all actions.
- SQL Server database integration.

---

## Prerequisites

Ensure the following tools are installed:

- [Node.js (Latest LTS)](https://nodejs.org/)  
- [npm (comes with Node.js)](https://www.npmjs.com/)  
- [Angular CLI (Latest)](https://angular.io/cli)  
  ```bash
  npm install -g @angular/cli

  ## Database Design

The project uses **SQL Server** with a single main table: `Employees`.  
Entity Framework Core handles migrations and schema creation.

### `Employees` Table Schema

| Column        | Type           | Constraints                 | Description                  |
|---------------|---------------|-----------------------------|------------------------------|
| EmployeeId    | INT           | Primary Key, Identity (1,1) | Unique identifier for employee |
| Name          | NVARCHAR(100) | NOT NULL                    | Full name of the employee     |
| Department    | NVARCHAR(100) | NOT NULL                    | Department name (e.g., HR, IT)|
| Email         | NVARCHAR(255) | NOT NULL, Unique            | Employee's email address      |
| PhoneNumber   | NVARCHAR(20)  | NULL                        | Contact phone number          |

### Entity Model (C#)

```csharp
public class Employee
{
    public int EmployeeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
}

### Migration Command
dotnet ef migrations add InitialCreate
dotnet ef database update


### ER Diagram

+------------------+
|   Employees      |
+------------------+
| EmployeeId (PK)  |
| Name             |
| Department       |
| Email (Unique)   |
| PhoneNumber      |
+------------------+

