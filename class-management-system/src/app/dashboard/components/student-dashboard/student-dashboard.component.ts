import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  classes = [
    { className: 'Math 101', subject: 'Algebra & Geometry', schedule: 'Mon & Wed, 10:00 AM' },
    { className: 'Science 202', subject: 'Physics & Chemistry', schedule: 'Tue & Thu, 12:00 PM' },
    { className: 'History 303', subject: 'World History', schedule: 'Fri, 2:00 PM' }
  ];
  assignments = [
    {
      title: 'Algebra Homework',
      dueDate: '2025-02-01',
      fileUrl: 'https://example.com/algebra-assignment.pdf'
    },
    {
      title: 'Physics Lab Report',
      dueDate: '2025-02-05',
      fileUrl: 'https://example.com/physics-lab-report.pdf'
    },
    {
      title: 'History Essay',
      dueDate: '2025-02-10',
      fileUrl: null
    }
  ];
  selectedFile: File | null = null;
  teacherAssignments: any[] = []; // Store teacher-uploaded assignments

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTeacherAssignments(); // Fetch teacher-uploaded assignments on component load
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
    }
  }

  submitAssignment(): void {
    if (this.selectedFile) {
      alert(`File "${this.selectedFile.name}" submitted successfully!`);
      this.selectedFile = null;
    } else {
      alert('Please select a file to submit.');
    }
  }

  // Fetch teacher-uploaded assignments
  fetchTeacherAssignments(): void {
    this.http.get<any[]>('http://localhost:5000/api/teacher/assignments/teacherAssignments').subscribe(
      (assignments) => {
        this.teacherAssignments = assignments; // Store fetched assignments
      },
      (error) => {
        console.error(error);
        alert('Failed to fetch teacher-uploaded assignments.');
      }
    );
  }
}