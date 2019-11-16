import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@IonicPage()
@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
})
export class VisitaPage {

  acompanante: boolean = false;
  auto: boolean = false;
  visita = {
    nombre: null,
    run: null,
    telefono: null,
    acompanantes: null,
    cantidad: null,
    autoIn: null,
    patente: null,
    id: null,
    fecha: null
  }

  dbId: any;
  uid: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
      this.dbId = navParams.get('dbId');
      this.uid = navParams.get('uid')
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitaPage');
  }

  nuevaVisita(){
    let load_newUser = this.loadingCtrl.create({
      content: 'Guardando visita'
    });
    const alert = this.alertCtrl.create({
      title: 'Nueva visita',
      message: '¿Desea confirmar nueva visita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            //this.load_newUser;
            load_newUser.present()
            this.visita.id = Date.now();
            if(this.visita.id){
              console.log(this.visita)
            }
            this.afProvider.nuevaVisita(this.dbId, this.visita, this.uid);
            setTimeout(() => {
              this.navCtrl.pop().then(()=>{
                load_newUser.dismiss();
              })
            }, 1000);
          }
        }
      ]
    });
    alert.present();
  }

  conAcompanante(){
    this.acompanante = true;
  }

  sinAcompanante(){
    this.acompanante = false;
  }

  conAuto(){
    this.auto = true;
  }

  sinAuto(){
    this.auto = false;
  }

}
