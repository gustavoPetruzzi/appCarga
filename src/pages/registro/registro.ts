import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuarios: Observable<any[]>
  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    this.usuarios = afDB.list('usuarios').valueChanges();
  }
  

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
