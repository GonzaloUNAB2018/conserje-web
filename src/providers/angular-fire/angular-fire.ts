import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AngularFireProvider {

  constructor(
    public http: HttpClient,
    private afDb: AngularFireDatabase
    ) {
    console.log('Hello AngularFireProvider Provider');
  }

  getNeighborData(uid){
    this.afDb.object('Neighbors/'+uid);
  }

  getNeighborVisitList(uid){
    this.afDb.list('Neighbors/'+uid+'/Visits');
  }

  getVisitInfo(uid, vid){
    this.afDb.object('Neighbors/'+uid+'/Visits/'+vid);
  }

}
