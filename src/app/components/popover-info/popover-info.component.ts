import { Component, Input, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { $Client } from 'src/app/services/client';
import { CustomersService } from 'src/app/services/customers.service';
import { LoadingSrvService } from 'src/app/services/loading-srv.service';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  @Input() customer: Observable<any>;

  opcionPopover = new BehaviorSubject(false);

  title: string = '';

  subTitle: string = '';

  isDelete = false;

  constructor(private popoverCtrl: PopoverController,
              private _customer: CustomersService,
              private loadingSrv:LoadingSrvService
              ) { }

  ngOnInit() {

    if(this.customer?.['opt'] === 2){

      this.title = "Eliminar a este Cliente";
      this.subTitle = "¿ Estas seguro ?";
      this.isDelete = true;

    }
    else{
      this.isDelete = false;
    }


  }

  //Eventos Principales
  clickView(customer) {
    this.popoverCtrl.dismiss({
      customer,
      opt:0
    })
  }

  clickEdit(customer) {
    this.popoverCtrl.dismiss({
      customer,
      opt:1
    })
  }

  clickDelete(customer) {
    this.popoverCtrl.dismiss({
      customer,
      opt:2
    })
  }

  //Evento Eliminar
onDismiss() {

  this.popoverCtrl.dismiss();

}

deleteClient(userData: any) {

  this._customer._deleteFire(userData?.['customer'].id).then(() => {

  this.loadingSrv.toastMessage('Dato Eliminado','secondary');

  }).catch(er => console.log(er));

  this.onDismiss();

}

}
