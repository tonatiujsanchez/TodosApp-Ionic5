import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item-model';
import { AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  //@ViewChild regresa el primer elemento del tipo indicado
  //@ViewChildren regresa un arreglo si hay varios elementos iguales
  @ViewChildren ( IonList ) itemLista:QueryList<IonList>;

  lista : Lista;
  nombreItem = '';

  constructor( private _todosService : TodosService,
               private activatedRoute: ActivatedRoute,
               public alertController: AlertController ) {

    const idLista = this.activatedRoute.snapshot.paramMap.get('listaId');
    this.lista = this._todosService.obtenerLista( idLista );    
  }

  ngOnInit() {
  }

  agregraItem(){
    if( this.nombreItem.length === 0 ){
      return;
    }
    
    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';

    this._todosService.guardarStorage();
  }
  
  cambioCheck(){
  
    const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado );
    
    if( pendientes.length === 0 ){
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date;
    }else{
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }

    this._todosService.guardarStorage();    
  }

  eliminarItem( idx: number ){
    this.lista.items.splice( idx, 1 );   
    this._todosService.guardarStorage();  
  }


  async editarItem( item:ListaItem ){
    const alert = await this.alertController.create({
      header: 'Editar tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: item.desc
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler: () => {
            this.itemLista['_results'][1].closeSlidingItems();
          }
        },
        {
          text:'Actualizar',
          handler: ( data ) => {
            if( data.titulo.length === 0 ){
              this.itemLista['_results'][1].closeSlidingItems();
              return;
            }

            item.desc = data.titulo;
            this._todosService.guardarStorage();
            this.itemLista['_results'][1].closeSlidingItems();       
          }
        }
      ]
    });

    alert.present();
  }


}
