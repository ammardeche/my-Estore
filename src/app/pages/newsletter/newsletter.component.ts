import { animate, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NewsletterComponent {
  showNewsletter: boolean = false;
  newsletterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showNewsletter = true;
    }, 2000);
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      console.log(
        'Newsletter subscription submitted with email:',
        this.newsletterForm.value.email
      );
      this.closeNewsletter(null); // Close after submission
    }
  }

  closeNewsletter(event: Event | null) {
    if (event) {
      // Prevent closing if the click is on the popup (not the overlay)
      event.stopPropagation();
      const target = event.target as HTMLElement;
      if (
        target.classList.contains('newsletter-content') ||
        target.closest('.newsletter-content')
      ) {
        return; // Don’t close if clicking inside the popup
      }
    }
    this.showNewsletter = false;
  }

  dontShowAgain(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      localStorage.setItem('hideNewsletter', 'true');
      this.showNewsletter = false;
    }
  }
}
