import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Codigo } from '../../clases/codigos';

/**
 * Generated class for the MuestraCodigosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-muestra-codigos',
  templateUrl: 'muestra-codigos.html',
})
export class MuestraCodigosPage {
  codigos:Codigo[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.codigos = this.navParams.get('codigos');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuestraCodigosPage');
  }

}
