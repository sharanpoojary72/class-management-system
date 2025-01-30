import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  activeTab: string = 'students'; // Tracks the active tab (students or teachers)
  students: any[] = []; // Array to store student data
  teachers: any[] = []; // Array to store teacher data
  filteredEntities: any[] = []; // Filtered list of students or teachers
  searchQuery: string = ''; // Search term

  // Modal state
  isModalOpen: boolean = false;
  modalTitle: string = '';
  isEditMode: boolean = false;

  // Form group for add/update
  entityForm: FormGroup;
  // Selected entity for editing
  selectedEntity: any = null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    // In admin-dashboard.component.ts
    this.entityForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        enrolledDate: ['', []], // For students
        course: ['', []], // For students
        speciality: ['', []], // For teachers
        experience: ['', []], // For teachers
        role: ['',[Validators.required]], // Default role
      },
      { validators: this.passwordMatchValidator } // Add custom validator
    );
  }

  ngOnInit(): void {
    this.setActiveTab(this.activeTab); // Set initial active tab and fetch data
  }

  prepareStudentForm() {
    // Clear teacher-specific fields
    this.entityForm.get('speciality')?.clearValidators();
    this.entityForm.get('experience')?.clearValidators();

    // Add student validators
    this.entityForm.get('course')?.setValidators([Validators.required]);
    this.entityForm.get('enrolledDate')?.setValidators([Validators.required]);

    // Update validity for all fields
    ['speciality', 'experience', 'course', 'enrolledDate'].forEach(field => {
      this.entityForm.get(field)?.updateValueAndValidity();
    });
  }

  prepareTeacherForm() {
    // Clear student-specific fields
    this.entityForm.get('course')?.clearValidators();
    this.entityForm.get('enrolledDate')?.clearValidators();

    // Add teacher validators
    this.entityForm.get('speciality')?.setValidators([Validators.required]);
    this.entityForm.get('experience')?.setValidators([Validators.required]);

    // Update validity for all fields
    ['course', 'enrolledDate', 'speciality', 'experience'].forEach(field => {
      this.entityForm.get(field)?.updateValueAndValidity();
    });
  }

  // Fetch data for the active tab
  fetchData(): void {
    if (this.activeTab === 'students') {
      this.adminService.getStudents().subscribe(
        (response) => {
          this.students = response.data;
          this.filteredEntities = this.students; // Initialize filteredEntities
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    } else {
      this.adminService.getTeachers().subscribe(
        (response) => {
          this.teachers = response.data;
          this.filteredEntities = this.teachers; // Initialize filteredEntities
        },
        (error) => {
          console.error('Error fetching teachers:', error);
        }
      );
    }
  }

  // Filter entities based on search term
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    if (this.activeTab === 'students') {
      this.filteredEntities = this.students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    } else {
      this.filteredEntities = this.teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query)
      );
    }
  }

  // Set active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.searchQuery = ''; // Reset search term
    this.entityForm.reset();
    // Set role based on the active tab
    const role = tab === 'students' ? 'Student' : 'Teacher';
    this.entityForm.get('role')?.setValue(role);

    // Reconfigure validators
    if (this.activeTab === 'students') {
      this.prepareStudentForm();
    } else {
      this.prepareTeacherForm();
    }

    this.fetchData();
  }

  // Open the modal for adding or updating
  openModal(isEdit: boolean, entity?: any): void {
    this.isEditMode = isEdit;
    this.isModalOpen = true;

    if (isEdit && entity) {
      this.modalTitle = `Update ${this.activeTab.slice(0, -1)}`;
      this.selectedEntity = entity;
      // Populate the form with entity data, excluding passwords
      const entityData = { ...entity };
      delete entityData.passwordHash; // Ensure we don't expose hashed passwords
      this.entityForm.patchValue(entityData);
    } else {
      this.modalTitle = `Add New ${this.activeTab.slice(0, -1)}`;
      this.entityForm.reset();
      this.selectedEntity = null;
    }
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.entityForm.reset();
    this.selectedEntity = null;
  }

  // Password match validator
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Add or update entity
  saveEntity(): void {
    if (this.entityForm.invalid) {
      // Highlight invalid fields
      this.entityForm.markAllAsTouched();
      console.log('Form is invalid:', this.entityForm.errors);
      return;
    }

    const data = { ...this.entityForm.value };


    // Remove fields not applicable to the activeTab
    if (this.activeTab === 'students') {
      delete data.speciality;
      delete data.experience;
    } else {
      delete data.course;
      delete data.enrolledDate;
    }

    // Ensure plain text password is sent
    if (data.password) {
      data.password = data.password; // Ensure plain text password is sent
      delete data.confirmPassword;
    }

    console.log('Sending data:', data); // Log the data being sent

    if (this.isEditMode && this.selectedEntity) {
      this.adminService.updatePerson(this.selectedEntity._id, data, this.activeTab).subscribe(
        (response) => {
          alert('Updated successfully!');
          this.closeModal();
          this.fetchData();
        },
        (error) => {
          console.error('Update error:', error);
          alert('Update failed! Check console for details.');
        }
      );
    } else {
      this.adminService.addPerson(data, this.activeTab).subscribe(
        (response) => {
          alert('Added successfully!');
          this.closeModal();
          this.fetchData();
        },
        (error) => {
          console.error('Add error:', error);
          alert('Add failed! Check console for details.');
        }
      );
    }
  }

  // Delete a student or teacher
  deleteEntity(id: string): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete this ${this.activeTab.slice(0, -1)}?`
    );
    if (confirmDelete) {
      const type = this.activeTab; // "students" or "teachers"
      this.adminService.deletePerson(id, type).subscribe(
        (response) => {
          alert(`${type.slice(0, -1)} deleted successfully!`);
          this.fetchData();
        },
        (error) => {
          console.error('Error deleting entity:', error);
        }
      );
    }
  }
}