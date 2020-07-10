import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor( public _todosService: TodosService,
               private router: Router,
               public alertController: AlertController ) { }

    async agregarLista(){
      const alert = await this.alertController.create({
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text:'Cancelar',
            role:'cancel',
            handler: () => {
              console.log('cancelar');
              
            }
          },
          {
            text:'Agregar',
            handler: ( data ) => {
              if( data.titulo.length === 0 ){
                return;
              }
              
              // Crear lista
              const idLista = this._todosService.crearLista( data.titulo );
              
              // Navegar a crear items de la lista 
              this.router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);

            }
          }
        ]
      });

      alert.present();
  }
}
