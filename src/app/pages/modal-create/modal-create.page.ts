import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/services/client';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.page.html',
  styleUrls: ['./modal-create.page.scss'],
})
export class ModalCreatePage implements OnInit {


  usuario: Client;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){


  }

}
