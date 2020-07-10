import { NgModule } from '@angular/core';
import { FiltroCompletadosPipe } from './filtro-completados.pipe';


@NgModule({
  declarations: [FiltroCompletadosPipe],
  exports: [FiltroCompletadosPipe]
})
export class PipesModule { }
