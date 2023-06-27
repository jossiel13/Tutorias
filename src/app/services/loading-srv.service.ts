import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingSrvService {

  constructor(private loadingCtrl:LoadingController,
              private toastController: ToastController) { }

              // loading
  async presentLoading(opt:LoadingOptions) {
    const loading = await this.loadingCtrl.create(opt);
    await loading.present();
  }

  async disMissLoading(){
    return await this.loadingCtrl.dismiss()
  }

              //Toast
async presentToast(opts: ToastOptions) {
  const toast = await this.toastController.create(opts);
  toast.present();
}


/// Method Toast -Saved
toastMessage(message:string,color:string) {
  this.presentToast({
    message: message,
    duration: 1500,
    color: color,
    icon: 'person-outline'
  });
}

/// Method Toast -Error
toastError(er: any) {
  this.presentToast({
    message: er,
    duration: 3000,
    color: 'warning',
    icon: 'alert-circle-outline'
  });
}

}
