import { Component } from '@angular/core';

@Component({
  selector: 'app-factura-calculator',
  templateUrl: './factura-calculator.component.html',
  styleUrls: ['./factura-calculator.component.css']
})
export class FacturaComponent {
  montoInicial: number;
  saldosFacturasInput: string;
  saldosFacturas: number[];
  facturasEncontradas: number[] | null;

  constructor() {
    this.montoInicial = 0;
    this.saldosFacturasInput = '';
    this.saldosFacturas = [];
    this.facturasEncontradas = null;
  }

  encontrarFacturasEnRango(): void {
    this.saldosFacturas = this.saldosFacturasInput.split(',').map(monto => parseFloat(monto));

    for (let longitudCombinacion = 1; longitudCombinacion <= this.saldosFacturas.length; longitudCombinacion++) {
      const combinaciones = this.getCombinations(this.saldosFacturas, longitudCombinacion);

      for (const combinacion of combinaciones) {
        const sumaCombinacion = combinacion.reduce((acc, val) => acc + val, 0);

        if (sumaCombinacion === this.montoInicial) {
          this.facturasEncontradas = combinacion;
          return;
        }
      }
    }

    this.facturasEncontradas = null;
  }

  private getCombinations(arr: number[], length: number): number[][] {
    const result: number[][] = [];
    const f = function (prefix: number[], arr: number[], n: number): void {
      if (n === 0) {
        result.push(prefix);
      } else {
        for (let i = 0; i < arr.length; i++) {
          f(prefix.concat(arr[i]), arr.slice(i + 1), n - 1);
        }
      }
    };
    f([], arr, length);
    return result;
  }
}