import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // Prevent default navigation for anchor links with # in href
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'A' &&
      target.getAttribute('href')?.startsWith('#')
    ) {
      event.preventDefault();
      console.log('Link clicked:', target.getAttribute('href')); // Debugging

      const href = target.getAttribute('href');
      if (href) {
        const targetId = href.substring(1); // Get the ID (e.g., "introduction")
        const targetElement = this.elementRef.nativeElement.querySelector(
          `#${targetId}`
        );

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          console.warn(`Element with ID ${targetId} not found`);
        }
      }
    }
  }
}
