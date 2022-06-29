import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amis } from 'src/app/interfaces/amis/amis';

@Injectable({
  providedIn: 'root'
})
export class AmisService {

  myAmis:Amis ={
    EMAIL_UTILISATEUR1:"",
    EMAIL_UTILISATEUR2:""
  }
  apiURL: string = 'http://localhost:3000/amis';

  constructor(private http:HttpClient) { }


  getAbonnementByUtilisateur(email: string) {
    return new Promise((resolve, reject) =>
      {
        this.http.get<Amis[]>(this.apiURL+"/EMAIL_UTILISATEUR1/"+email)
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

  abonner(ami:Amis) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Amis>(this.apiURL,ami)
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


  desabonner(ami: Amis){
    return new Promise((resolve, reject) =>
      {
        this.http.delete(this.apiURL+"/EMAIL_UTILISATEUR1/"+ami.EMAIL_UTILISATEUR1+"/EMAIL_UTILISATEUR2/"+ami.EMAIL_UTILISATEUR2).subscribe(
          res =>{
            resolve(res);
          },
          err =>{
            reject(err);
          }
        )
      }
    )
  }

}
