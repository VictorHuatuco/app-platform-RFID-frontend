import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor() {}

  // Método para construir el FormGroup de manera dinámica
  public buildForm<T extends Record<string, any>>(
    fields: T,
    validators?: { [K in keyof T]?: any[] }
  ): FormGroup {
    const group: { [key: string]: FormControl } = {};

    Object.keys(fields).forEach((key) => {
      const typedKey = key as keyof T;
      const value = fields[typedKey];
      const fieldValidators = validators?.[typedKey] ?? [];
      group[key] = new FormControl(value || '', fieldValidators);
    });
    const resultado = new FormGroup(group);
    return resultado;
  }
}
