import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  uid: string;

  constructor(
    public navCtrl: NavController,
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth
    ) {
      this.uid = this.afAuth.auth.currentUser.uid;
      if(this.uid){
        this.afProvider.getNeighborData(this.uid);
      }

  }

}
