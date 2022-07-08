import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiURL: string = 'http://localhost:3000/post';

  myPost:Post ={
    EMAIL_UTILISATEUR:'',
    NOM_PROFIL:'',
    TEXT:'',
    IMAGE_URL:'',
    COUNT_COMMENT:0,
    COUNT_LIKE:0,
    
    LIKES:[],
    COMMENTAIRES:[],
    DATE_POST:'',
    USER_LIKE:'',
    PHOTO_DE_PROFIL:''
  }


  constructor(private http:HttpClient) { }


  createNewPost(post:Post) {
    return new Promise((resolve, reject) =>
      {
        this.http.post<Post>(this.apiURL,post)
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

  getPosts() {
    return new Promise((resolve, reject) =>
      {
        this.http.get<Post[]>(this.apiURL)
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

  getPostsByUtilisateur(email:string) {
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
  getPostsByUtilisateurOrderedByDate(email:string) {
    return new Promise((resolve, reject) =>
      {
        this.http.get(this.apiURL+"/EMAIL_UTILISATEUR/"+email+"/DATE/any")
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
