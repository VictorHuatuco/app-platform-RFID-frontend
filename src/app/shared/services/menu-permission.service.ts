import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app.contants';

@Injectable({
  providedIn: 'root'
})
export class MenuPermissionService  {

  private permissions: any[] = [];

  constructor() {
    this.loadPermissions();
  }

  // Cargar permisos desde localStorage
  loadPermissions(): void {
    const permissionsFromStorage = localStorage.getItem(AppConstants.Storage.MENU);
    //this.permissions = permissionsFromStorage ? JSON.parse(permissionsFromStorage) : [];
  }

  // Validar si tiene permiso de lectura para un módulo
  hasReadPermission(moduleId: number): boolean {
    const permission = this.permissions.find(p => p.MenuModuleId === moduleId);
    return permission && permission.Permission === 'r';
  }

  // Validar si tiene permiso de escritura para un módulo
  hasWritePermission(moduleId: number): boolean {
    const permission = this.permissions.find(p => p.MenuModuleId === moduleId);
    return permission && permission.Permission === 'w';
  }

}
