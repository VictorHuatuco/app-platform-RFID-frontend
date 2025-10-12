import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

interface Subsystem {
  name: string;
  inactive: boolean;
}
@Component({
  selector: 'app-subsystems-trade',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './subsystems-trade.component.html',
  styleUrl: './subsystems-trade.component.css',
})
export class SubsystemsTradeComponent {
  ngOnInit() {
    setTimeout(() => {
      document.body.classList.add('bg-loaded');
    }, 50);
  }
  tradeSystems: Subsystem[] = [
    {
      name: 'AUDITORIA',
      inactive: false,
    },
    {
      name: 'VENTAS',
      inactive: false,
    },
    {
      name: 'MERCADERISMO',
      inactive: true,
    },
    {
      name: 'PROMOTORIA',
      inactive: true,
    },
  ];
  constructor(private router: Router) {}
  redirectHome() {
    this.router.navigate(['/home/admin/scheduling']);
  }
}
