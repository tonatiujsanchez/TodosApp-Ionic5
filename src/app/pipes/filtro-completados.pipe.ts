import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletados',
  pure: false
})
export class FiltroCompletadosPipe implements PipeTransform {

  transform(listas: Lista[], terminada: boolean = true): Lista[] {
    
    return listas.filter( lista => lista.terminada === terminada );
  }

}
