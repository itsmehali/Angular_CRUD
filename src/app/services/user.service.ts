import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserResponse {
  id?: number;
  message: string;
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  deleteUser(id: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.userUrl}/${id}`);
  }
}
