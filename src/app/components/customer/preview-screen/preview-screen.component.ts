import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-screen.component.html',
  styleUrl: './preview-screen.component.css',
})
export class PreviewScreenComponent {
  animationFinished: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.afterAnimationEnd();
    }, 2100);
    setTimeout(() => {
      document.body.classList.add('bg-loaded');
    }, 50);
  }

  afterAnimationEnd() {
    console.log('Animación terminada');
    this.animationFinished = true;
  }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
