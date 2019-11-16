import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs';
import { VisitasPage } from '../visitas/visitas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid: string;
  dbId: any;
  user: Observable<any>;
  usr: any;
  profile: any;
  genero: any;
  db : any;
  database = {
    id: null,
    commit: null,
    name: null,
    type: null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      let load_home = this.loadingCtrl.create({
        content: 'Cargando datos de usuario'
      });
      load_home.present();
      this.dbId = navParams.get('dbId');
      this.uid = navParams.get('uid');
      console.log(this.dbId, this.uid);
      if(this.dbId&&this.uid){
        this.user = this.afProvider.getUserData(this.dbId, this.uid).valueChanges();
        this.afProvider.getUserData(this.dbId, this.uid).valueChanges().subscribe(usr=>{
          this.usr = usr;
          if(this.usr.profile === 'conserje'){
            this.profile = 'Conserje';
          }else if(this.usr.profile === 'vecino'){
            this.profile = 'Vecino';
          };
          if(this.usr.sex === 'man'){
            this.genero = 'o';
          }else if(this.usr.sex === 'woman'){
            this.genero = 'a'
          }
        })
      };
      if(this.dbId){
        this.afProvider.getDatabaseData(this.dbId).valueChanges().subscribe(dbData=>{
          this.db =  dbData;
          if(this.db){
            this.database.name = this.db.name;
            this.database.commit = this.db.commit;
            this.database.type = this.db.type;
            this.database.id = this.db.id;
            console.log(this.database);
            if(this.database){
              load_home.dismiss();
            }
          }
        })
      }

      setTimeout(() => {
        if(this.database === undefined){
          load_home.dismiss().then(()=>{
            alert('Tiempo de espera mayor a lo esperado');
            this.afAuth.auth.signOut().then(()=>{
              let load_logout = this.loadingCtrl.create({
                content: 'Vuelva a iniciar sesión'
              });
              load_logout.present()
              setTimeout(() => {
                this.navCtrl.setRoot(LoginPage).then(()=>{
                  load_logout.dismiss();
                })
              }, 1000);
            })
          })
        }else{
          console.log('Do nothing!')
        }
      }, 10000);

  }

  logout(){
    const alerta = this.alertCtrl.create({
      title: 'Salir',
      message: '¿Realmente quieres salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            let load_logout = this.loadingCtrl.create({
              content: 'Saliendo...'
            });
            load_logout.present();
            this.afAuth.auth.signOut().then(()=>{
              this.navCtrl.setRoot(LoginPage).then(()=>{
                load_logout.dismiss();
              })
            }).catch(e=>{
              alert(e);
              load_logout.dismiss();
            })
          }
        }
      ]
    });
    alerta.present();
    
  }

  toVisitasPage(){
    this.navCtrl.push(VisitasPage, {dbId: this.dbId, uid: this.uid});
  }

}
