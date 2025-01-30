// contact-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const endpoint = 'https://formspree.io/f/xkgnbjaq'; // Replace with your Formspree endpoint
      this.http.post(endpoint, formData).subscribe({
        next: () => {
          alert('Your message has been sent successfully!');
          this.contactForm.reset();
          this.submitted = false; // Reset submitted flag after successful submission
        },
        error: () => {
          alert('There was an error sending your message. Please try again later.');
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!field && ((field.touched || this.submitted) && field.invalid);
  }
}