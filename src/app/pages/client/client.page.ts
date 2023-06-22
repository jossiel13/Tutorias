import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalCreatePage } from '../modal-create/modal-create.page';
import { Client } from 'src/app/services/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  clients: Observable<any>;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  async mostrarModal() {
    const modal = await this.modalCtrl.create(
      {
        component: ModalCreatePage,
        //Se pueden declarar estilos personalizados > cssClass
        componentProps: {
          // nombre:'name',
          // pais:'CU'
        }
      })

    await modal.present();

    const { data } = await modal.onWillDismiss();

  }


  createCustomer() {

    return;

  }


  onSearchChange(even) {

    console.log(even);


  }

}
