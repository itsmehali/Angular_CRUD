import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
  id?: number;
  name: string;
  users: User[];
}

export interface DepartmentDelete {
  id: number;
  name: string;
  users: User[];
}

export interface User {
  id?: number;
  name: string;
  birthday: Date;
}

export interface CreateDepartmentDto {
  departments: Department[];
}

export interface DepartmentResponse {
  id?: number;
  message: string;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/department/users';
  private departmentUrl = 'http://localhost:3000/department';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  createDepartments(
    newDepartment: CreateDepartmentDto
  ): Observable<DepartmentResponse> {
    return this.http.post<DepartmentResponse>(
      this.departmentUrl,
      newDepartment
    );
  }

  deleteDepartment(id: number): Observable<DepartmentResponse> {
    return this.http.delete<DepartmentResponse>(`${this.departmentUrl}/${id}`);
  }
}
