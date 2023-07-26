import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  CreateDepartmentDto,
  Department,
  DepartmentResponse,
  DepartmentService,
} from '../services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css'],
})
export class DepartmentCreateComponent {
  @Input() departmentName: string = '';
  @Input() users: { name: string; birthday: Date }[] = [
    { name: '', birthday: new Date() },
  ];

  constructor(private departmentService: DepartmentService) {}

  onAddUserInput() {
    this.users.push({ name: '', birthday: new Date() });
  }

  onCreateDepartment() {
    if (this.users.length === 0) {
      alert('Legalább egy felhasználót adj hozzá a Department-hez!');
      return;
    }

    // Hozzáadjuk a felhasználókhoz a Department nevét
    const newDepartment: CreateDepartmentDto = {
      departments: [
        {
          name: this.departmentName,
          users: this.users,
        },
      ],
    };

    // Hívjuk meg a createDepartments() metódust a DepartmentService segítségével

    this.departmentService.createDepartments(newDepartment).subscribe({
      next: (departmentResponse: DepartmentResponse) => {
        // Itt tudod kezelni a választ, például megjeleníteni az üzenetet
        alert(departmentResponse.message);

        // Töröljük a beviteli mezők tartalmát a sikerrelépés után
        this.departmentName = '';
        this.users = [{ name: '', birthday: new Date() }];
      },
      error: (error: Error) => {
        // Itt tudod kezelni a hibát és megjeleníteni az üzenetet
        console.error('Error while creating department:', error);
        alert('Hiba történt a Department létrehozása közben.');
      },
    });
  }
}
