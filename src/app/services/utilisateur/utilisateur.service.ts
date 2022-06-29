import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iutilisateur } from 'src/app/interfaces/utilisateur/iutilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  apiURL: string = 'http://localhost:3000/utilisateur';

  myUtilisateur:Iutilisateur ={
    EMAIL:'',
    NOM:'',
    PRENOM:'',
    TELEPHONE:0,
    PASSWORD:''
  }


  constructor(private http:HttpClient) { }


  createNewUtilisateur(utilisateur:Iutilisateur) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Iutilisateur>(this.apiURL,utilisateur)
        .subscribe
        (
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }

  getUtilisateurs() {
    return new Promise((resolve, reject) =>
      {
        this.http.get(this.apiURL)
        .subscribe
        (
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }

  getUtilisateur(email:string) {
    return new Promise((resolve, reject) =>
      {
        this.http.get(this.apiURL+"/"+email)
        .subscribe
        (
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }


}
