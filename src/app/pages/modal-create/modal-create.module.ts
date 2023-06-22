import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCreatePageRoutingModule } from './modal-create-routing.module';

import { ModalCreatePage } from './modal-create.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCreatePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModalCreatePage]
})
export class ModalCreatePageModule {}
