import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  //ViewChild regresa el primer elemento del tipo indicado
  @ViewChild( IonList ) lista: IonList;
  @Input() terminda = true;

  constructor( public _todosService: TodosService,
               private router: Router,
               public alertController: AlertController ) { }

  ngOnInit() {}


  verLista( idLista:number ){
    if( this.terminda ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ idLista }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ idLista }`);

    }
  }

  eliminarLista( idLista: number ){
    this._todosService.eliminarLista( idLista );
  }

  async editarLista( lista:Lista ){
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler: () => {
            this.lista.closeSlidingItems();    
          }
        },
        {
          text:'Actualizar',
          handler: ( data ) => {
            if( data.titulo.length === 0 ){
              this.lista.closeSlidingItems();
              return;
            }
            
            lista.titulo = data.titulo;
            this._todosService.guardarStorage();
            this.lista.closeSlidingItems();
            

          }
        }
      ]
    });

    alert.present();
  }

}
