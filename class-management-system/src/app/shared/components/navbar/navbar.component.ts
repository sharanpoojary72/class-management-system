// navbar.component.ts
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleMenu(): void {
    const slidingMenu = document.getElementById('sliding-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (slidingMenu && menuToggle) {
      const isOpen = slidingMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    }
  }

  closeMenu(): void {
    const slidingMenu = document.getElementById('sliding-menu');
    if (slidingMenu) {
      slidingMenu.classList.remove('open'); // Close the menu
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const slidingMenu = document.getElementById('sliding-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (
      slidingMenu &&
      !slidingMenu.contains(event.target as Node) &&
      menuToggle &&
      !menuToggle.contains(event.target as Node)
    ) {
      this.closeMenu();
    }
  }
}