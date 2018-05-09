import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuestraCodigosPage } from './muestra-codigos';

@NgModule({
  declarations: [
    MuestraCodigosPage,
  ],
  imports: [
    IonicPageModule.forChild(MuestraCodigosPage),
  ],
})
export class MuestraCodigosPageModule {}
