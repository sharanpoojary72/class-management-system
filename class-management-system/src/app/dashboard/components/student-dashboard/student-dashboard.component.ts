import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

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
}




// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Class {
//   className: string;
//   subject: string;
//   schedule: string;
// }

// interface Assignment {
//   title: string;
//   dueDate: string;
//   fileUrl?: string;
// }

// @Component({
//   selector: 'app-student-dashboard',
//   templateUrl: './student-dashboard.component.html',
//   styleUrls: ['./student-dashboard.component.css']
// })
// export class StudentDashboardComponent implements OnInit {
//   classes: Class[] = [];
//   assignments: Assignment[] = [];
//   selectedFile: File | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.getClasses();
//     this.getAssignments();
//   }

//   // Fetch classes from the server
//   getClasses(): void {
//     this.http.get<Class[]>('http://localhost:3000/api/classes').subscribe({
//       next: (data) => (this.classes = data),
//       error: (err) => console.error('Error fetching classes:', err),
//     });
//   }

//   // Fetch assignments from the server
//   getAssignments(): void {
//     this.http.get<Assignment[]>('http://localhost:3000/api/assignments').subscribe({
//       next: (data) => (this.assignments = data),
//       error: (err) => console.error('Error fetching assignments:', err),
//     });
//   }

//   // Handle file selection
//   onFileSelected(event: any): void {
//     this.selectedFile = event.target.files[0];
//   }

//   // Submit assignment to the server
//   submitAssignment(): void {
//     if (this.selectedFile) {
//       const formData = new FormData();
//       formData.append('assignment', this.selectedFile);

//       this.http.post('http://localhost:3000/api/assignments', formData).subscribe({
//         next: () => {
//           alert('Assignment submitted successfully!');
//           this.selectedFile = null;
//           this.getAssignments(); // Refresh assignments
//         },
//         error: (err) => console.error('Error submitting assignment:', err),
//       });
//     } else {
//       alert('Please select a file to upload.');
//     }
//   }
// }
