import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverInfoComponent } from './popover-info/popover-info.component';

@NgModule({
  declarations: [HeaderComponent,PopoverInfoComponent],
  exports:[HeaderComponent,PopoverInfoComponent] ,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
