import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  selectedEmployee: Employee = { name: '', department: '', email: '', phoneNumber: '' };

  
  isSaving = false;
  isCancelling = false;
  loadingEditId: number | null = null;
  loadingDeleteId: number | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: data => this.employees = data,
      error: () => alert('Failed to load employees')
    });
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }

  clearSelection(): void {
    this.selectedEmployee = { name: '', department: '', email: '', phoneNumber: '' };
  }

  saveEmployee(): void {
    if (!this.selectedEmployee) return;
    this.isSaving = true;

    const employee = this.selectedEmployee;

    if (employee.employeeId) {
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          alert('Employee updated!');
          this.loadEmployees();
          this.clearSelection();
          this.isSaving = false;
        },
        error: () => {
          alert('Error updating employee');
          this.isSaving = false;
        }
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          alert('Employee added!');
          this.loadEmployees();
          this.clearSelection();
          this.isSaving = false;
        },
        error: () => {
          alert('Error adding employee');
          this.isSaving = false;
        }
      });
    }
  }

  editEmployee(emp: Employee): void {
    this.loadingEditId = emp.employeeId ?? null;

    setTimeout(() => {
      this.selectedEmployee = { ...emp };
      this.loadingEditId = null;
    }, 500); 
  }

  resetForm(): void {
    this.isCancelling = true;
    setTimeout(() => {
      this.selectedEmployee = this.getEmptyEmployee();
      this.isCancelling = false;
    }, 400); 
  }

  confirmDelete(id: number): void {
    if (!confirm('Are you sure to delete this employee?')) return;

    this.loadingDeleteId = id;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted!');
        this.loadEmployees();
        if (this.selectedEmployee.employeeId === id) {
          this.clearSelection();
        }
        this.loadingDeleteId = null;
      },
      error: () => {
        alert('Error deleting employee');
        this.loadingDeleteId = null;
      }
    });
  }

  private getEmptyEmployee(): Employee {
    return {
      employeeId: 0,
      name: '',
      department: '',
      email: '',
      phoneNumber: ''
    };
  }
}
