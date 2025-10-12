import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../services/theme/theme.service';
import { AppConstants } from '../../../../shared/constants/app.contants';

interface System {
  name: string;
  logo: string;
  inactive: boolean;
  id: number;
}
@Component({
  selector: 'app-global-systems',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './global-systems.component.html',
  styleUrl: './global-systems.component.css',
})
export class GlobalSystemsComponent {
  globalSystems: System[] = [
    {
      id: 2,
      name: 'TRADE+',
      logo: 'assets/img/logo-Trade.png',
      inactive: true,
    },
    {
      id: 1,
      name: 'FLOW+',
      logo: 'assets/img/logo-Flow.png',
      inactive: true,
    },
    {
      id: 3,
      name: 'INSIGHT+',
      logo: 'assets/img/logo-Insight.png',
      inactive: true,
    },
  ];
  filteredSystems: System[] = [];

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.updateSystemsStatus();

    setTimeout(() => {
      document.body.classList.add('bg-loaded');
    }, 50);
  }

  updateSystemsStatus() {
    const storedValue = localStorage.getItem(AppConstants.Storage.SYSTEMS);
    let allowedSystems: number[] = [];

    if (storedValue) {
      try {
        // Convertir la cadena "2,3" en un array [2, 3]
        allowedSystems = storedValue
          .split(',') // Separar por comas
          .map((num) => Number(num.trim())) // Convertir a número y eliminar espacios
          .filter((num) => !isNaN(num)); // Filtrar valores inválidos

        console.log('allowedSystems:', allowedSystems);
      } catch (error) {
        console.error('Error al procesar localStorage system value:', error);
      }
    }

    console.log('Sistemas permitidos:', allowedSystems);

    // Modificar el estado de los sistemas sin filtrarlos
    this.globalSystems = this.globalSystems.map((system) => ({
      ...system,
      inactive: !allowedSystems.includes(system.id), // Marcar como inactivo si no está en localStorage
    }));
  }

  redirectToSubsystems(name: string) {
    localStorage.setItem('system', name);
    if (name === 'TRADE+') {
      this.router.navigate(['/global-systems/subsystems']);
    } else if (name === 'FLOW+') {
      this.router.navigate(['/home/dashboard/vehicle-access-management']);
    } else if (name === 'INSIGHT+') {
      this.router.navigate(['/home/dashboard/general']);
    }
  }
}
