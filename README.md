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
## Application Architecture

- **Frontend:**  
  - Built with **Angular (latest)** as a **SPA**.  
  - Uses **Bootstrap 5** for styling and a responsive layout.  
  - All interactions (CRUD operations) are handled dynamically via API calls; no server-side rendering is used.

- **Backend:**  
  - Built with **.NET Core Web API (latest)**.  
  - Provides RESTful endpoints for all employee management operations.  
  - Uses **Entity Framework Core (Code-First)** with **SQL Server** for database storage.

- **SPA vs MPA Decision:**  
  - The project follows a **SPA approach** for better user experience (no page reloads, faster updates) and separation of concerns between frontend and backend.  
  - Backend purely serves JSON, no Razor/MVC server-side views.

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
```

## Database Design

The project uses **SQL Server** with a single primary table: `Employees`.  
Entity Framework Core (EF Core) is used in **Code-First** mode, meaning the database schema is generated automatically from the C# entity models.

---

### Data Dictionary

| Field         | Data Type       | Constraints                 | Description                                      |
|---------------|-----------------|-----------------------------|--------------------------------------------------|
| EmployeeId    | INT             | Primary Key, Identity (1,1) | Auto-incrementing unique identifier for employees |
| Name          | NVARCHAR(100)   | NOT NULL                    | Full name of the employee                        |
| Department    | NVARCHAR(100)   | NOT NULL                    | Department where the employee works (e.g., HR)   |
| Email         | NVARCHAR(255)   | NOT NULL, Unique            | Employee email (must be unique across records)   |
| PhoneNumber   | NVARCHAR(20)    | NULL                        | Optional phone number for contact                |

---

### Index Documentation

- **Primary Index (Clustered):**  
  - `EmployeeId`  
  - Created by default as the primary key.  
  - Ensures each employee record can be uniquely identified.  

- **Unique Index (Non-Clustered):**  
  - `Email`  
  - Automatically enforced via `Unique` constraint in the entity.  
  - Prevents duplicate employee email addresses.  

---

### Code-First vs Database-First

This project uses **Code-First** approach because:

1. **Rapid Development:**  
   - Developers can define models directly in C# and generate the database automatically.

2. **Version Control for Schema:**  
   - Migrations keep schema changes tracked as code, making it easy to roll forward/backward.

3. **Simplified Setup:**  
   - New developers can clone the project, run migrations, and get the database ready without manually creating tables.

4. **Flexibility:**  
   - Future schema changes can be handled by simply updating the model and creating a new migration.

---

### Migration Commands

Run the following commands to create and apply the schema:

```bash
# Create migration files based on current model
dotnet ef migrations add InitialCreate

# Apply migrations and create/update the database
dotnet ef database update
```

### Screeshot

<img width="1920" height="1080" alt="Screenshot (256)" src="https://github.com/user-attachments/assets/30599473-1717-4a47-882b-5ae967ae4375" />

