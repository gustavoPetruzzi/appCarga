import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomePage }from '../home/home';

import { RegistroPage } from '../registro/registro';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  nombre: string;
  pass: string;
  clave: string;
  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private angularFire: AngularFireAuth) 
  {

  }


  ingresar(){
    switch (this.nombre) {
      case 'admin@gmail.com':
        this.clave= '111111';
        break;
      case 'invitado@gmail.com':
        this.clave = '222222';
        break;
      case 'usuario@gmail.com':
        this.clave = '333333';
        break;
      case 'anonimo@gmail.com':
        this.clave = '444444';
        break;
      case 'tester@gmail.com':
        this.clave = '555555';
        break;
      default:
        this.clave = this.pass;
        break;
    }
    this.login();
  }
  
  async login(){
    let esperador = this.esperar();
    esperador.present();
    await this.angularFire.auth.signInWithEmailAndPassword(this.nombre,this.clave)
      .then(result => 
        {
          esperador.dismiss();
          

          let fondo = `
          <div>
            <ion-row text-center>
              <img src="assets/imgs/logueado.png">
            </ion-row>
            <ion-row>
              <h1> Logueado correctamente! </h1>
            </ion-row> 
          </div> `;
          let logueadoBien = this.esperar(fondo);
          logueadoBien.present();

          logueadoBien.onDidDismiss(() => {
            this.navCtrl.setRoot(HomePage, { nombre:this.nombre })    
          })
          
          
          setTimeout(function() {
            logueadoBien.dismiss();  
          }, 1000);


        })
      .catch(error =>
        {
          esperador.dismiss();
          console.log("NO SE HA LOGUEADO")
        });
   }
    
    /*
    console.log(this.nombre)
    console.log(this.pass)
    if(this.nombre == "gustavo" && this.pass =="admin"){
      let data = {
        nombre : this.nombre,
      };

      let toast = this.toastCtrl.create({
        message: "Se ha logueado",
        duration: 2000,
        position: 'bottom'
      });

      toast.onDidDismiss(() =>{
        this.navCtrl.push(HomePage,{
          data: data
        });
      });

      toast.present();

    }
    else{
      let toast = this.toastCtrl.create({
        message: "No se ha logueado",
        duration: 2000,
        position: 'bottom'
      });

      toast.onDidDismiss(() =>{
        console.log("No se ha logueado");
      });
      
      toast.present();  
    }
    */

  esperar(personalizado?:string) {
    let loading;
    if(!personalizado){
      loading = this.loadingCtrl.create({

        content: 'Por favor, espere...'
      });
    }
    else{
      loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: personalizado,
      })
    }
    return loading;
  }
  registrar(){
    this.navCtrl.push(RegistroPage);
  }

}

