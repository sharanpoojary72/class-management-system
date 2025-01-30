import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private baseUrl = `${environment.apiUrl}`; // Replace with your backend base URL

    constructor(private http: HttpClient) { }

    // Fetch students from the backend
    getStudents(): Observable<any> {
        return this.http.get(`${this.baseUrl}/students`);
    }

    // Fetch teachers from the backend
    getTeachers(): Observable<any> {
        return this.http.get(`${this.baseUrl}/teachers`);
    }

    // Add a new student or teacher
    addPerson(data: any, type: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/${type}`, data); // Remove "/api/" if not needed
    }


    // Update a student or teacher
    updatePerson(id: string, data: any, type: string): Observable<any> {
        return this.http.put(`${this.baseUrl}/${type}/${id}`, data);
    }

    // Delete a student or teacher
    deletePerson(id: string, type: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${type}/${id}`);
    }

}
