import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any[], texto:string): any[] {


    if (texto === '') { return value; } //cadena vacia retorna all data

    if (!value) { return value }//Distinto de cadena retorna all data

    //Sensitive Case "JavaScript" conversion
    texto = texto.toLocaleLowerCase();

    return value.filter(item => item.value.toLowerCase().includes(texto));

  }

}
