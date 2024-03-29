import { Component } from '@angular/core';
import { Department, DepartmentService } from '../services/department.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }

  navigateToCreateDepartment() {
    this.router.navigate(['/create-department']);
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe((deparment) => {
      this.departments = deparment;
    });
  }

  onDeleteDepartment(id: number | undefined) {
    this.departmentService.deleteDepartment(id!).subscribe({
      next: (response) => {
        alert(response.message);

        //update list
        this.getDepartments();
      },
      error: (error: Error) => {
        alert('Error while deleting');
      },
    });
  }

  onDeleteUser(id: number | undefined) {
    this.userService.deleteUser(id!).subscribe({
      next: (response) => {
        alert(response.message);

        this.getDepartments();
      },
      error: (error: Error) => {
        console.log(error);

        alert('Erro while deleting');
      },
    });
  }
}
