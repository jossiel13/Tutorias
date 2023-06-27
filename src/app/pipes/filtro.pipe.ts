import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(allData: any[], textoBusqueda: string): any[] {

    console.log(allData);


    console.log(textoBusqueda);

    if (textoBusqueda === '') { return allData; } //cadena vacia retorna all data

    if (!allData) { return allData }//Distinto de cadena retorna all data

    //Sensitive Case "JavaScript" conversion
    textoBusqueda = textoBusqueda.toLocaleLowerCase();

    return allData.filter(item =>
      item.name.toLowerCase().includes(textoBusqueda));

  }

}
