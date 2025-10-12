import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  /**
   * Exporta una tabla a Excel con opciones avanzadas
   * @param dataSource Fuente de datos de la tabla (MatTableDataSource o Array de objetos)
   * @param fileName Nombre del archivo a exportar
   * @param selectedFields Campos a exportar del JSON (opcional)
   * @param customHeaders Map de cabeceras personalizadas {campoOriginal: 'Cabecera Personalizada'}
   */
  exportTableToExcel(
    dataSource: MatTableDataSource<any> | any[],
    fileName: string,
    selectedFields: string[] = [],
    customHeaders: { [key: string]: string } = {}
  ): void {
    const data = Array.isArray(dataSource) ? dataSource : dataSource.data;

    // Filtrar y renombrar campos
    const filteredData = data.map((row) => {
      const filteredRow: any = {};
      (selectedFields.length > 0 ? selectedFields : Object.keys(row)).forEach(
        (key) => {
          filteredRow[customHeaders[key] || key] = row[key];
        }
      );
      return filteredRow;
    });

    // Generar encabezados personalizados
    const headerRow =
      Object.values(customHeaders).length > 0
        ? Object.values(customHeaders)
        : Object.keys(filteredData[0]);

    // Crear hoja
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    // XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: 'A1' });

    // Ajustar ancho de columnas según contenido
    const columnWidths = headerRow.map((header, i) => {
      const colData = [header, ...filteredData.map((row) => row[header])];
      const maxLength = colData.reduce((acc, val) => {
        const len = val ? val.toString().length : 0;
        return Math.max(acc, len);
      }, 0);
      return { wch: Math.max(maxLength + 2, 15) };
    });
    worksheet['!cols'] = columnWidths;

    // Aplicar estilos a la fila de encabezado
    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellRef]) continue;

      worksheet[cellRef].s = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '808080' } }, // gris
        alignment: { horizontal: 'center', vertical: 'center' },
      };
    }

    // Crear archivo
    const workbook: XLSX.WorkBook = {
      Sheets: { Datos: worksheet },
      SheetNames: ['Datos'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true,
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  /**
   * Guarda el archivo Excel en el navegador
   * @param buffer Datos del archivo
   * @param fileName Nombre del archivo
   */
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }

  readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(jsonData); // aquí obtienes los datos como array de objetos
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
