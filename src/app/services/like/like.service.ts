import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from 'src/app/interfaces/like/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  apiURL: string = 'http://localhost:3000/likes';

  myCommentaire:Like ={
    ID_LIKE:0,
    EMAIL_UTILISATEUR:'',
    ID_POST:0,
    DATE_LIKE:new Date(),
    
  }


  constructor(private http:HttpClient) { }


  createNewLike(like:Like) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Like>(this.apiURL,like)
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

  getLikesByPost(idPost:any) {
    return new Promise((resolve, reject) =>
      {
        this.http.get<any[]>(this.apiURL+"/ID_POST/"+idPost)
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

  getLikesByUser(email:string) {
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

  getLikeByUserAndByPost(idpost:any,email:string) {
    return new Promise((resolve, reject) =>
      {
        this.http.get(this.apiURL+"/ID_POST/"+idpost+"&EMAIL_UTILISATEUR/"+email)
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

  deleteLike(like: Like){
    return new Promise((resolve, reject) =>
      {
        this.http.delete(this.apiURL+"/"+like.ID_LIKE).subscribe(
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
