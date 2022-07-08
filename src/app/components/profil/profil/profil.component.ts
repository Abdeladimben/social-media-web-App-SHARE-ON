import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Amis } from 'src/app/interfaces/amis/amis';
import { Commentaire } from 'src/app/interfaces/commentaire/commentaire';
import { Like } from 'src/app/interfaces/like/like';
import { Post } from 'src/app/interfaces/post/post';
import { Iprofil } from 'src/app/interfaces/profil/iprofil';
import { Iutilisateur } from 'src/app/interfaces/utilisateur/iutilisateur';
import { AmisService } from 'src/app/services/amis/amis.service';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { LikeService } from 'src/app/services/like/like.service';
import { PostService } from 'src/app/services/post/post.service';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profil:Iprofil ={

    EMAIL:'',
    NOM_UTILISATEUR:'',
    PHOTO_DE_PROFIL:'',
    ADRESSE:'',
    GENRE:'',
    DATE_NAISSANCE:''

  }
  utilisateur:Iutilisateur ={
    EMAIL:'',
    NOM:'',
    PRENOM:'',
    TELEPHONE:0,
    PASSWORD:''
  }
  ami:Amis ={
    EMAIL_UTILISATEUR1:"",
    EMAIL_UTILISATEUR2:""
  }

  likeicon=false;
  selectedFile:any;
  text = "";
  newTextCommentaire:string ="";
  posts:Array<Post> = [];
  likes:Array<any> = [];
  listAmis:Array<any> = [];
  commentText:Array<string> = [];
  myPost:Post ={
    ID_POST:0,
    EMAIL_UTILISATEUR: "", 
    NOM_PROFIL: "",
    TEXT: "",
    IMAGE_URL: "",
    COUNT_COMMENT: 0,
    COUNT_LIKE: 0,
    DATE_POST:'',
    LIKES:[],
    COMMENTAIRES:[],
    USER_LIKE:'favorite',
    PHOTO_DE_PROFIL:""
  }
  profilImage:SafeHtml="../assets/img/icons8-user-100.png";

  email:string=localStorage.getItem('email')+'';

  checkUser:boolean=true;

  abonnement:string="";

  constructor(@Inject(LOCALE_ID) private locale: string,private domSanitizer:DomSanitizer,private amisService:AmisService,private utilisateurService:UtilisateurService,private profilService:ProfilService,private postService:PostService,private commentaireService:CommentaireService,private likeService:LikeService,private storage: AngularFireStorage,private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('emailVersProfil')==undefined){
      this.email=localStorage.getItem('email')+'';
      this.checkUser=true;
    }else{
      this.email=localStorage.getItem('emailVersProfil')+'';
      this.checkUser=false;
    }
    

    console.log(this.email+" ggggggggg");
    let listemails=[this.email]
    console.log(listemails);
    this.profilService.getProfilByListOfEmails(listemails).then((res:any)=>{
      console.log(res)
      this.profil=res.data[0];
      this.profilImage=(this.profil.PHOTO_DE_PROFIL==null)?this.domSanitizer.bypassSecurityTrustResourceUrl(this.profilImage.toString()):this.domSanitizer.bypassSecurityTrustResourceUrl(this.profil.PHOTO_DE_PROFIL);
      this.ami={
        EMAIL_UTILISATEUR1:localStorage.getItem('email')+'',
        EMAIL_UTILISATEUR2:localStorage.getItem('emailVersProfil')+''
      }

      if(localStorage.getItem('emailVersProfil')!=undefined){
        console.log("gf")
        this.amisService.getAbonnementByUtilisateur(localStorage.getItem('email')+'').then((resultat:any)=>{
          console.log(resultat)
          if(resultat.data==undefined){
            this.abonnement="S'abonner"
          }else{
            resultat.data.filter((a:Amis)=>{this.listAmis.push(a.EMAIL_UTILISATEUR2)});
            console.log("this.listAmis")
            console.log(this.listAmis)
            this.listAmis.every((a:string)=>{
              console.log(a+"  ||  "+localStorage.getItem('emailVersProfil')+"")
              if(a==localStorage.getItem('emailVersProfil')+""){
                
                this.abonnement="Se désabonner"
                return false;
              }else{
                this.abonnement="S'abonner"
                return true;
              }
              
            })
          }
          
  
        })
      }

 

    }).catch((err:any)=>{
      console.log(err);
    })

    

    this.utilisateurService.getUtilisateur(this.email).then((res:any)=>{
      console.log(res);
      this.utilisateur=res.data[0];
      console.log(this.utilisateur);
    }).catch((err:any)=>{
      console.log(err);
    })

    this.postService.getPostsByUtilisateur(this.email).then((result:any)=>{
      //console.log(result);
      result.data?.forEach((post:any) => {
        /*console.log("for");
        console.log(post);*/
        
        this.commentaireService.getCommentairesByPost(post.ID_POST).then(
          (resultat:any)=>{
            //console.log(resultat);
            post.COMMENTAIRES=[];
            post.COMMENTAIRES.push(resultat.data);
            console.log(post);
          }
        ).catch(
          (error) =>{
            console.log(error);
          }
        )
        this.likeService.getLikesByPost(post.ID_POST).then(
          (resultat:any)=>{
            post.LIKES=[];
            post.LIKES!.push(resultat.data);
            console.log(post);
            this.posts.filter(post=>{post.USER_LIKE='favorite_border'});
          }
        ).catch(
          (error) =>{
            console.log(error);
          }
        )
        
      });

      /*this.posts.forEach(post => {
        console.log("fff")
        Object.entries(post.LIKES).forEach(like=>{
          console.log("like")
          if(like[EMAIL_UTILISATEUR]==localStorage.getItem('email')+''){
            console.error("post.ID_POST==like.ID_POST")
            post.USER_LIKE='favorite_border';
          }else{
            console.error("post.ID_POST!=like.ID_POST")
            post.USER_LIKE='favorite';
          }
        })
      })*/

      this.likeService.getLikesByUser(this.email).then(
        (res:any)=>{
          if(res.data!=undefined){
            
            this.likes.push(res.data);
            //console.log(this.likes);
            //console.log("likes kaynine");
            this.posts.forEach(post=>{
              //console.log('this.likes[0]');
              //console.log(this.likes[0]);
              this.likes[0].forEach((like:any)=>{
                //console.log('like');
                //console.log(like);
                //console.log("post :"+post.ID_POST+" like :"+like.ID_LIKE+like.ID_POST);
                if(post.ID_POST==like.ID_POST){
                  //console.error("post.ID_POST==like.ID_POST")
                  post.USER_LIKE='favorite';
                }
                
              })
            })
          }else{
            console.log(res);
            console.log("likes makayninech");
          }
        }
      )

      
      this.posts=result.data;

    })

  }


  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }



  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(()=>{
          let imageURL = fileRef.getDownloadURL();
          imageURL.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url);
            }
          });
        })
      ).subscribe(
        (url)=>{
          if(url){
            console.log(url);
          }
        }
      );
    });
  }

  

  poster(){
    let emails=[this.email]
    
    this.profilService.getProfilByListOfEmails(emails).then((res:any)=>{
      this.profilImage=res.data[0].PHOTO_DE_PROFIL;

      console.log("profil");
      console.log(res.data[0].PHOTO_DE_PROFIL);
        if(this.selectedFile==null || this.selectedFile==undefined){
        this.myPost ={
          EMAIL_UTILISATEUR:this.email,
          NOM_PROFIL:localStorage.getItem('username')+'',
          TEXT:this.text,
          IMAGE_URL:"",
          COUNT_COMMENT:0,
          COUNT_LIKE:0,
          LIKES:[],
          COMMENTAIRES:[],
          DATE_POST:formatDate(Date.now(),'YYYY/MM/dd',this.locale) ,
          USER_LIKE:'favorite_border',
          PHOTO_DE_PROFIL:this.profilImage+""
        }
        
        
      }else{
        this.uploadImage().then((imageUrl)=>{
          this.myPost={
            EMAIL_UTILISATEUR:this.email,
            NOM_PROFIL:localStorage.getItem('username')+'',
            TEXT:this.text,
            IMAGE_URL:imageUrl+"",
            COUNT_COMMENT:0,
            COUNT_LIKE:0,
            LIKES:[],
            COMMENTAIRES:[],
            DATE_POST:formatDate(Date.now(),'YYYY/MM/dd',this.locale),
            USER_LIKE:'favorite_border',
            PHOTO_DE_PROFIL:this.profilImage+""
          }
          
        })
      }
      console.log(this.myPost.DATE_POST);
        
        this.postService.createNewPost(this.myPost).then((res)=>{
          console.log(this.myPost)
          this.posts.push(this.myPost);
          console.log("ajout succées");
        })
    })
    
  }




  like(idPost:any,i:number){
    this.likeicon = !this.likeicon;
    if(idPost==undefined){

    }
    this.likeService.getLikeByUserAndByPost(idPost,this.email).then(
      (res:any)=>{
        console.log(res)
        if(res.data==undefined){
          let myLike:Like={
            EMAIL_UTILISATEUR:this.email,
            ID_POST:idPost,
            
          }
          this.likeService.createNewLike(myLike).then(
            (res:any)=>{
              console.log('this.posts[i]');
              console.log(this.posts[this.posts.length-i-1]);
              
                if(this.posts[this.posts.length-i-1].ID_POST==myLike.ID_POST){
                  console.error("post.ID_POST==like.ID_POST hhh")
                  this.posts[this.posts.length-i-1].USER_LIKE='favorite';
                  this.posts[this.posts.length-i-1].COUNT_LIKE++;
                  console.log(this.posts[this.posts.length-i-1])
                }
              
              /*this.posts.every(post => {
                if(post.ID_POST==myLike.ID_POST){
                  console.error("post.ID_POST==like.ID_POST")
                  post.USER_LIKE='favorite';
                  post.COUNT_LIKE++;
                  return false
                }else{ 
                  return true}
              })*/
            }
          ).catch(
            (err:any)=>{
              console.log(err);
            }
          )
        }else{
          this.likeService.deleteLike(res.data[0]).then(
            (resultat:any)=>{
              console.log(this.posts[this.posts.length-i-1]);
              console.log('this.posts[this.posts.length-i-1]');
              console.log(this.posts[this.posts.length-i-1]);
              if(this.posts[this.posts.length-i-1].ID_POST==res.data[0].ID_POST){
                console.error("post.ID_POST==like.ID_POST delete")
                this.posts[this.posts.length-i-1].USER_LIKE='favorite_border';
                this.posts[this.posts.length-i-1].COUNT_LIKE--;
                
                console.log(this.posts[this.posts.length-i-1]);
              }
            }
          ).catch(
            (err:any)=>{
              console.log(err);
            }
          )
        }
      }
    )
  }

  commentaire(idPost:any,i:number){
    let myCommentaire:Commentaire ={
      ID_COMMENTAIRE:0,
      EMAIL_UTILISATEUR:this.email,
      NOM_UTILISATEUR:localStorage.getItem('username')+'',
      ID_POST:idPost,
      TEXTE:this.commentText[i],
      DATE_COMMENTAIRE:new Date()
    };
    this.commentaireService.createNewCommentaire(myCommentaire).then(
      (res)=>{
        if(idPost==this.posts[this.posts.length-i-1].ID_POST){
          if(this.posts[this.posts.length-i-1].COMMENTAIRES[0]==undefined){
            this.posts[this.posts.length-i-1].COMMENTAIRES[0]=[myCommentaire];
            console.log(1);
          }else{
            this.posts[this.posts.length-i-1].COMMENTAIRES[0].push(myCommentaire);
            console.log(2);
          }
          console.log("ajout commentaire");
          this.posts[this.posts.length-i-1].COUNT_COMMENT++;
          this.commentText[i]="";
        }
        /*this.posts.every(post=>{
          if(idPost==post.ID_POST){
            post.COMMENTAIRES?.push(myCommentaire);
            console.log("ajout commentaire");
            post.COUNT_COMMENT++;
            return false;
          }else{
            return true;
          }
          
        })*/
      }
    )
  }

  abonner(){
    let index:number=this.listAmis.indexOf(localStorage.getItem('emailVersProfil'));
    console.log(index)
    if(index==-1){
      this.ami={
        EMAIL_UTILISATEUR1:localStorage.getItem('email')+'',
        EMAIL_UTILISATEUR2:localStorage.getItem('emailVersProfil')+''
      }
      this.amisService.abonner(this.ami).then((res:any)=>{
        this.listAmis.push(this.ami.EMAIL_UTILISATEUR2);
        console.log("abonnement succeés");
        this.abonnement="Se désabonner";
      }).catch((err:any)=>{
        console.log("err")
      })
    }else{
      this.ami={
        EMAIL_UTILISATEUR1:localStorage.getItem('email')+'',
        EMAIL_UTILISATEUR2:localStorage.getItem('emailVersProfil')+''
      }
      this.amisService.desabonner(this.ami).then((res:any)=>{
        this.listAmis.splice(index,1);
        this.abonnement="S'abonner";
        console.log("Désabonnement succeés");
      }).catch((err:any)=>{
        console.log("err")
      })
    }
    /*this.listAmis.every((email:string)=>{

      if(email!=localStorage.getItem('emailVersProfil')+""){
        console.log(email);
        console.log(localStorage.getItem('emailVersProfil'))
        this.ami={
          EMAIL_UTILISATEUR1:localStorage.getItem('email')+'',
          EMAIL_UTILISATEUR2:localStorage.getItem('emailVersProfil')+''
        }
        this.amisService.abonner(this.ami).then((res:any)=>{
          this.listAmis.push(this.ami);
          console.log("abonnement succeés");
          this.abonnement="Se désabonner";
        }).catch((err:any)=>{
          console.log("err")
        })
      }else{
        this.ami={
          EMAIL_UTILISATEUR1:localStorage.getItem('email')+'',
          EMAIL_UTILISATEUR2:localStorage.getItem('emailVersProfil')+''
        }
        this.amisService.desabonner(this.ami).then((res:any)=>{
          this.abonnement="S'abonner";
          console.log("Désabonnement succeés");
        }).catch((err:any)=>{
          console.log("err")
        })
      }
    })*/

  }





}
