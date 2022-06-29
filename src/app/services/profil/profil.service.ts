import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iprofil } from 'src/app/interfaces/profil/iprofil';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private apiURL: string = 'http://localhost:3000/profil';

  myProfil:Iprofil ={
    EMAIL:"",
    NOM_UTILISATEUR:"",
    PHOTO_DE_PROFIL:"",
    ADRESSE:"",
    GENRE:"",
    DATE_NAISSANCE:new Date(0)+""
  }


  constructor(private http:HttpClient) { }


  createNewProfil(profil:Iprofil) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Iprofil>(this.apiURL,profil)
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

  getProfils() {
    return new Promise((resolve, reject) =>
      {
        this.http.get<any>(this.apiURL)
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




  getProfilByListOfEmails(list:string[]){
    let values:string=list.toString();
    return new Promise((resolve, reject) =>
      {
        this.http.get<Iprofil>(this.apiURL+"/EMAIL/"+values)
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
