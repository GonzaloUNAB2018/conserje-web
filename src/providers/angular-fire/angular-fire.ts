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

  public getUserDb(uid){
    return this.afDb.object('Users/'+uid)
  }
  
  public getUserData(dbId, uid){
    return this.afDb.object('Databases/'+dbId+'/Users/'+uid);
  }

  public getDatabaseData(dbId){
    return this.afDb.object('Databases/'+dbId+'/Data');
  }

  public nuevaVisita(dbId, visita, uid){
    this.afDb.database.ref('Databases/'+dbId+'/Visitas/'+visita.id).set(visita);
    this.afDb.database.ref('Databases/'+dbId+'/Users/'+uid+'/Visitas/'+visita.id).set(visita);
  }

  public borrarVisita(dbId, id, uid){
    this.afDb.database.ref('Databases/'+dbId+'/Visitas/'+id).remove();
    this.afDb.database.ref('Databases/'+dbId+'/Users/'+uid+'/Visitas/'+id).remove();
  }

  public getVisitas(dbId, uid){
    return this.afDb.list('Databases/'+dbId+'/Users/'+uid+'/Visitas/');
  }
  

}
