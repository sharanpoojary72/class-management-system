// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role'] as string;
    console.log('AuthGuard: Required Role:', requiredRole);
    console.log('AuthGuard: User Role:', this.authService.getRole());

    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (userRole?.toLowerCase() === requiredRole.toLowerCase()) {
        console.log('AuthGuard: Access granted');
        return true;
      } else {
        console.log('AuthGuard: Access denied, redirecting to login');
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      console.log('AuthGuard: Not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}