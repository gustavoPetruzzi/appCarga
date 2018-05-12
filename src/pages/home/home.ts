import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Codigo } from '../../clases/codigos';
import { Usuario } from '../../clases/usuario';
import { MuestraCodigosPage } from '../muestra-codigos/muestra-codigos';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario:Usuario;
  
  credito:number;
  recienCargado = 0;
  codigo:string;
  constructor(
    public navCtrl: NavController, 
    public params: NavParams, 
    private scanner: BarcodeScanner, 
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    
  ) 
  {
    this.usuario = new Usuario();
    this.usuario = this.params.get('usuario');
    this.credito = this.usuario.credito;
    console.log(this.usuario);
    
  }





  escanear(){
    
    this.scanner.scan().then(barcodeData => {
      //let leido = new Codigo(barcodeData.text, 0);
      this.codigo = barcodeData.text
      this.cargarCredito();
    }).catch(err => {
      console.log('Error', err);
    });
  }
  usado(nuevo: string):boolean{
    let usado = false;
    this.usuario.usados.forEach(element => { 
      if(element == nuevo){
        usado = true;        
      }
    });
    return usado;
  }
  guardar(mensaje:string){
    let cargando = this.spinnerCargando();
    cargando.present();
    let toaster =this.presentToast(mensaje);
    this.firestore
    .collection('usuarios')
    .doc(this.usuario.id)
    .set(
      { credito: this.usuario.credito,
        usados: this.usuario.usados,
        nombre: this.usuario.nombre,
        clave: this.usuario.clave,
        perfil: this.usuario.perfil,
        sexo: this.usuario.sexo   },
      { merge: true }
    ).then(res =>{
      cargando.dismiss();
      this.credito = this.usuario.credito;
      toaster.present();
      setTimeout(function() {
        toaster.dismiss();
      }, 3000);
    })  
  }

  spinnerCargando(){
    let spinner = this.loadingCtrl.create({
      content: "Cargando Credito...",
    })
    return spinner;
  }

  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    return toast;
}
  cargarCredito(){
      if(!this.usado(this.codigo)){
        if(this.codigo == "8c95def646b6127282ed50454b73240300dccabc"){
          //let monto = 10;
          //this.cargado(monto);
          this.usuario.credito +=10;
          this.usuario.usados.push(this.codigo);
          this.guardar("Se cargo 10 credito!");
         
        }
        else if(this.codigo == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 "){
          this.usuario.credito+=50;
          this.usuario.usados.push(this.codigo);
          this.guardar("Se cargo 50 credito!");
          
        }
        else if(this.codigo == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f"){
          this.usuario.credito+=100;
          this.usuario.usados.push(this.codigo);
          this.guardar("Se cargo 100 credito!");
          
        }
        else{
          let toaster =this.presentToast("Codigo no identificado");
          toaster.present();
          setTimeout(function() {
            toaster.dismiss();
          }, 3000);
        }
      }
      else{
        let toaster =                                                                                                                                               this.presentToast("Codigo Ya usado!");
        toaster.present();
          setTimeout(function() {
            toaster.dismiss();
          }, 3000);
      }
  }
    /*
  cargado(monto:number){
    this.recienCargado = "+ $" + monto;
    setTimeout(monto =>{
      this.recienCargado = "+ $" + monto;
    },3000)
  }
  */



}
