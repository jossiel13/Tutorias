import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController, PopoverController } from '@ionic/angular';
import { Observable, Subscription, map } from 'rxjs';
import { ModalCreatePage } from '../modal-create/modal-create.page';
import { CustomersService } from 'src/app/services/customers.service';
import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';
import { $Client } from 'src/app/services/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  @ViewChild('popover') popover;

  client$: Observable<$Client[]>;

  isOpen = false;

  @Input() customer: Observable<any>;

  textoBusqueda: string = '';

  isDelete = false;

  getDataSub:Subscription;

  constructor(private modalCtrl: ModalController,
    private _customer: CustomersService,
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {

    this.getData();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.getDataSub){this.getDataSub.unsubscribe()}
  }

  getData() {

    this.client$ = this._customer._getFire();

this.getDataSub=this.client$.subscribe({
  next:(clients)=>{console.log(clients)},
  error:(error)=>{console.log(error)},
  complete:()=>{console.log('Observable Finalizado');//No se ejecuta = Firebase
  }

});

  }

  //Para Crear - registrar
  async mostrarModal(customer) {

    const modal = await this.modalCtrl.create(
      {
        component: ModalCreatePage,
        backdropDismiss: false,
        //Se pueden declarar estilos personalizados > cssClass
        componentProps: {
          customer
        }
      })

    await modal.present();

    //Esto es para obtener valores despues de cerrar
    // const { data } = await modal.onWillDismiss();

  }


  async presentPopover(ev: any, client: any) {

    const popover = await this.popoverCtrl.create({
      component: PopoverInfoComponent,
      event: ev,
      translucent: true,
      backdropDismiss: false,
      componentProps: {
        customer: client
      }
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();

    console.log(data.opt);


    if (data.opt === 2) {

      popover.dismiss();

      const popoverDelete = await this.popoverCtrl.create({
        component: PopoverInfoComponent,
        event: ev,
        translucent: true,
        backdropDismiss: false,
        componentProps: {
          customer: data
        }

      })

      await popoverDelete.present();

    } else { this.mostrarModal(data); }


  }

  onSearchChange(even) {

    this.textoBusqueda = even.detail.value;

    console.log(even.detail.value);

  }

}
