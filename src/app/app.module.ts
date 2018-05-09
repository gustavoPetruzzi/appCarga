import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
import { MuestraCodigosPage } from '../pages/muestra-codigos/muestra-codigos';
import { RegistroPage } from '../pages/registro/registro';
//BarCodeScanner
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//AF

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBL7LrUdPL17ifVhMLBA0Rsu0-RLn81hF4",
  authDomain: "logueo-ffa46.firebaseapp.com",
  databaseURL: "https://logueo-ffa46.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "799164691041"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SplashPage,
    RegistroPage,
    MuestraCodigosPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SplashPage,
    RegistroPage,
    MuestraCodigosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    BarcodeScanner,
    AngularFireDatabase
  ]
})
export class AppModule {}
