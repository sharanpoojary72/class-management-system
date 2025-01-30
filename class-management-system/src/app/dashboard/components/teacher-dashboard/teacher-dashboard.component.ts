import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
  // Dummy data
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

  constructor() { }

  ngOnInit(): void { }

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

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.newAssignment.file = input.files[0];
    }
  }

  // Upload assignment
  uploadAssignment(): void {
    if (this.selectedClass && this.newAssignment.title && this.newAssignment.file) {
      console.log('Assignment Uploaded: ', {
        class: this.selectedClass,
        assignment: this.newAssignment,
      });
      alert('Assignment uploaded successfully!');
      this.newAssignment = { title: '', file: null };
    } else {
      alert('Please fill out all fields and select a file.');
    }
  }
}
