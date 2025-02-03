import { Component,OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  ngOnInit(): void {
    // Initialize AOS
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether the animation should only occur once
    });
  }
}
