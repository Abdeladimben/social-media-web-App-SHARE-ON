import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Commentaire } from 'src/app/interfaces/commentaire/commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  apiURL: string = 'http://localhost:3000/commentaires';

  myCommentaire:Commentaire ={
    ID_COMMENTAIRE:0,
    EMAIL_UTILISATEUR:'',
    NOM_UTILISATEUR:'',
    ID_POST:0,
    TEXTE:"",
    DATE_COMMENTAIRE:new Date()
  }


  constructor(private http:HttpClient) { }


  createNewCommentaire(commentaire:Commentaire) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Commentaire>(this.apiURL,commentaire)
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

  getCommentairesByPost(idPost:any) {
    return new Promise((resolve, reject) =>
      {
        this.http.get<Commentaire[]>(this.apiURL+"/ID_POST/"+idPost)
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

  getCommentaireByUser(email:string) {
    return new Promise((resolve, reject) =>
      {
        this.http.get(this.apiURL+"/EMAIL_UTILISATEUR/"+email)
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
