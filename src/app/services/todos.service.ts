import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  listas: Lista[] = [];

  constructor() {
    
    this.cargarStorage();
    
    }


    crearLista( titulo: string ){
      const nuevaLista = new Lista( titulo );

      this.listas.push( nuevaLista );
      this.guardarStorage();

      return nuevaLista .id;
    }

    guardarStorage(){
      localStorage.setItem( 'data', JSON.stringify(this.listas) );
    }
  
    cargarStorage(){
      if(localStorage.getItem('data')){
        this.listas = JSON.parse(localStorage.getItem('data'));
      }
    }
    
    obtenerLista( id: string | number ){
      id = Number(id);
      return this.listas.find( listaData => listaData.id === id );
    }

    eliminarLista( idLista: number ){
      this.listas = this.listas.filter( dataListas => dataListas.id !== idLista );
      this.guardarStorage();
    }
  
}
