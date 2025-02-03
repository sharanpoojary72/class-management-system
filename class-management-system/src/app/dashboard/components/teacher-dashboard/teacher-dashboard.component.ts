import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
  classes = [
    { className: 'Math 101', subject: 'Algebra', schedule: 'Mon & Wed, 10:00 AM' },
    { className: 'Science 202', subject: 'Physics', schedule: 'Tue & Thu, 12:00 PM' },
  ];
  newClass = {
    className: '',
    subject: '',
    schedule: '',
  };
  newAssignment = {
    title: '',
    file: null as File | null,
  };
  selectedClass: any = null;
  studentsAssignments: any[] = [];
  teacherAssignments: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudentsAssignments();
    this.fetchTeacherAssignments();
  }

  // Fetch students' assignments
  fetchStudentsAssignments(): void {
    this.http.get<any[]>('http://localhost:5000/api/teacher/assignments/students').subscribe(
      (assignments) => {
        this.studentsAssignments = assignments;
      },
      (error) => {
        console.error(error);
        alert('Failed to fetch students\' assignments.');
      }
    );
  }

  // Fetch teacher-uploaded assignments
  fetchTeacherAssignments(): void {
    this.http.get<any[]>('http://localhost:5000/api/teacher/assignments/teacherAssignments').subscribe(
      (assignments) => {
        this.teacherAssignments = assignments;
      },
      (error) => {
        console.error(error);
        alert('Failed to fetch teacher assignments.');
      }
    );
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.newAssignment.file = input.files[0];
    }
  }

  // Upload teacher assignment
  uploadAssignment(): void {
    if (!this.selectedClass || !this.newAssignment.title || !this.newAssignment.file) {
      alert('Please fill out all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.newAssignment.file);
    formData.append('teacherId', 'TEACHER123'); // Replace with actual teacher ID
    formData.append('className', this.selectedClass.className);
    formData.append('title', this.newAssignment.title);
    formData.append('dueDate', '2025-02-15'); // Replace with actual due date

    this.http.post('http://localhost:5000/api/teacher/assignments/upload', formData).subscribe(
      (response: any) => {
        alert('Assignment uploaded successfully!');
        this.newAssignment = { title: '', file: null };
        this.fetchTeacherAssignments(); // Refresh the list of teacher assignments
      },
      (error) => {
        console.error(error);
        alert('Failed to upload assignment.');
      }
    );
  }

  // Create a new class
  createClass(): void {
    if (this.newClass.className && this.newClass.subject && this.newClass.schedule) {
      this.classes.push({ ...this.newClass });
      alert('Class created successfully!');
      this.newClass = { className: '', subject: '', schedule: '' };
    } else {
      alert('Please fill out all fields.');
    }
  }
}