import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { EMPTY, Observable } from 'rxjs';
import { PopoverInfoComponent } from 'src/app/components/popover-info/popover-info.component';
import { $Client, UpdateClienteI } from 'src/app/services/client';
import { CustomersService } from 'src/app/services/customers.service';
import { Router } from '@angular/router';
import { LoadingSrvService } from 'src/app/services/loading-srv.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.page.html',
  styleUrls: ['./modal-create.page.scss'],
})
export class ModalCreatePage implements OnInit {

  @Input() customer: UpdateClienteI;

  ifOpcPopover$: string = '';

  usuario = {} as $Client;

  isReadOnly = false;

  title: string = '';

  subTitle: string = '';

  showButton = true;

  showButtonView = false;

  showButtonUpdate = false;

  showButtonDelete = false;

  constructor(private modalCtrl: ModalController,
    private popoverCtlr: PopoverController,
    private _customer: CustomersService,
    private _loadingSrv: LoadingSrvService
  ) { }

  ngOnInit() {

    let opcion = 3;

    console.log(this.customer);
    console.log(this.usuario);


    //Delegar Datos
    if (this.customer) {

//       this.usuario = {

// name:this.customer.customer.name,
// lastName:this.customer.customer.lastName,
// address:this.customer.customer.address,
// dni:this.customer.customer.dni,
// email:this.customer.customer.email

//       };

//Clone
// this.usuario=structuredClone(this.customer.customer);

//spread op
this.usuario={...this.customer.customer}

//clonar con conversion JSON

      console.log(this.usuario);


      opcion = this.customer?.['opt'];

      console.log(opcion);

    }


    switch (opcion) {
      case 0:
        this.isReadOnly = true;
        this.title = "Cliente";
        this.subTitle = "Visualizar Datos";

        this.showButtonView = true;
        this.showButton = false;
        break;
      case 1:
        this.title = "Cliente";
        this.subTitle = "Actualizar Datos";

        this.showButtonUpdate = true;
        this.showButton = false;
        break;
      case 2:
        this.title = "Cliente";
        this.subTitle = "Eliminar Datos";

        this.showButtonDelete = true;
        this.showButton = false;
        break;
      default:
        this.title = "Cliente";
        this.subTitle = "Agregar Datos";
        this.showButton = true;
        break;
    }


  }


  //Eventos

  async addData(formulario: any) {

    console.log(formulario.value);


    this._loadingSrv.presentLoading({ message: 'Guardando ...' });

    //Delegar Valores
    this.usuario =
    {
      name: formulario.value.name,
      lastName: formulario.value.lastName,
      address: formulario.value.address,
      dni: formulario.value.dni,
      email: formulario.value.email,
      dateCreate: new Date().toLocaleString()

    }//Transformar Fecha toISOString().slice(0,10) = > yyyy-mm-dd

    await this._customer._addFire(this.usuario).then(() => {

      this._loadingSrv.toastMessage('Datos Actualizados', 'success');
      //Don't Show
      this._loadingSrv.disMissLoading();
      this.cerrarModal();

    }).catch(er => {
      this._loadingSrv.toastError(er);
    });

  }

  updateData(userData: any, formulario: any) {

    const data: $Client =
    {
      name: formulario.value.name,
      lastName: formulario.value.lastName,
      address: formulario.value.address,
      dni: formulario.value.dni,
      email: formulario.value.email,
      // dateCreate: new Date(),
    }

    this._customer._upFire(userData.id, data).then(() => {

      this._loadingSrv.toastMessage('Datos Actualizados', 'success');
      //Don't Show
      this.cerrarModal();

    }).catch(er => this._loadingSrv.toastError(er));

  }


  // async presentPopover(userData: any) {

  //   const popover = await this.popoverCtlr.create({
  //     component: PopoverInfoComponent,
  //     translucent: true,
  //     backdropDismiss: false,
  //     componentProps: {
  //       customer: userData
  //     }
  //   });

  //   await popover.present();

  // }

  //+=======
  cerrarModal() {

    localStorage.clear();
    this.modalCtrl.dismiss();

  }

}
