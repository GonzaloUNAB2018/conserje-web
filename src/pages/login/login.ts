import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Footer } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  db: any;
  uid: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    private afProvider: AngularFireProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.getUserState();
  }

  getUserState(){
    let load1 = this.loadingCtrl.create({
      content : 'Detectando usuario iniciado'
    });
    load1.present();
    this.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        load1.dismiss();
        let load = this.loadingCtrl.create({
          content: 'Ingresando a portal...'
        });
        load.present();
        this.uid = this.afAuth.auth.currentUser.uid;
          if(this.uid){
            console.log(this.uid);
            this.afProvider.getUserDb(this.uid).valueChanges().subscribe(userDb=>{
              this.db = userDb;
              if(this.db){
                console.log(this.db.id);
                this.navCtrl.setRoot(HomePage, {dbId:this.db.id, uid: this.uid}).then(()=>{
                  load.dismiss();
                })
              }
            })
          }
      }else{
        //this.navCtrl.setRoot(LoginPage);
        load1.dismiss();
      }
    })
  }

  login(){
    if(this.email&&this.password){
      let load = this.loadingCtrl.create({
        content: 'Ingresando a portal...'
      });
      load.present();
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>{
        if(user){
          this.uid = this.afAuth.auth.currentUser.uid;
          if(this.uid){
            console.log(this.uid);
            this.afProvider.getUserDb(this.uid).valueChanges().subscribe(userDb=>{
              this.db = userDb;
              if(this.db){
                console.log(this.db.id);
                this.navCtrl.setRoot(HomePage, {dbId:this.db.id, uid: this.uid}).then(()=>{
                  load.dismiss();
                })
              }
            })
          }
          
        }
      }).catch(e=>{
        console.log(e);
        alert(e);
        load.dismiss();
      });
    }else{
      alert('Faltan Datos')
    }
  }

}
