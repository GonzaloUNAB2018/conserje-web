import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { VisitaPage } from '../visita/visita';

/**
 * Generated class for the VisitasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitas',
  templateUrl: 'visitas.html',
})
export class VisitasPage {

  dbId: any;
  uid: any;
  visitas: any[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public alertCtrl: AlertController
    ) {
      this.dbId = navParams.get('dbId');
      this.uid = navParams.get('uid');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitasPage');
    this.afProvider.getVisitas(this.dbId, this.uid).valueChanges().subscribe(vs =>{
      this.visitas = vs;
      console.log(this.visitas)
    })
  }

  addVisita(){
    this.navCtrl.push(VisitaPage, {dbId: this.dbId, uid: this.uid})
  }

  deleteVisita(id, name){
    const alert = this.alertCtrl.create({
      title: 'Borrar Visita',
      message: 'Se borrará visita inscrita de '+name,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.afProvider.borrarVisita(this.dbId, id, this.uid);
          }
        }
      ]
    });
    alert.present();
  }



}
