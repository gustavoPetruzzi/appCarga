import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Codigo } from '../../clases/codigos';
import { MuestraCodigosPage } from '../muestra-codigos/muestra-codigos'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario:string;
  codigos:Codigo[] = new Array();
  credito:number= 0;
  recienCargado:string = "0";
  codigo:Codigo;
  constructor(
    public navCtrl: NavController, 
    public params: NavParams, 
    private scanner: BarcodeScanner, 
    private toastCtrl: ToastController, 
  ) 
  {
    this.usuario = this.params.get('usuario');
  }



  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  escanear(){
    
    this.scanner.scan().then(barcodeData => {
      let leido = new Codigo(barcodeData.text, 0);
      this.codigo = leido;
      this.cargarCredito();
    }).catch(err => {
      console.log('Error', err);
    });
  }
  usado(nuevo: Codigo):boolean{
    let usado = false;
    this.codigos.forEach(element => { 
      if(element.codigo == nuevo.codigo){
        usado = true;        
      }
    });
    return usado;
  }
  cargarCredito(){
      if(!this.usado(this.codigo)){
        if(this.codigo.codigo == "8c95def646b6127282ed50454b73240300dccabc"){
          let monto = 10;
          this.cargado(monto);
          this.credito+=10;
          this.codigos.push(this.codigo);
          this.presentToast("Se cargo 10 credito!");
        }
        else if(this.codigo.codigo == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 "){
          let monto = 10;
          this.cargado(monto);
          this.credito+=50;
          this.codigos.push(this.codigo);
          this.presentToast("Se cargo 50 credito!");
        }
        else if(this.codigo.codigo == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f"){
          let monto = 10;
          this.cargado(monto);
          this.credito+=100;
          this.codigos.push(this.codigo);
          this.presentToast("Se cargo 100 credito!");
        }
        else{
          this.presentToast("Codigo no identificado");
        }
      }
      else{
        this.presentToast("Codigo Ya usado!");
      }
  }
  cargado(monto:number){
    this.recienCargado = "+ $" + monto;
    setTimeout(monto =>{
      this.recienCargado = "+ $" + monto;
    },3000)
  }



}
