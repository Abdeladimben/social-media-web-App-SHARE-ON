import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { finalize } from 'rxjs/operators';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { LikeService } from 'src/app/services/like/like.service';
import { Like } from 'src/app/interfaces/like/like';
import { Commentaire } from 'src/app/interfaces/commentaire/commentaire';
import { AmisService } from 'src/app/services/amis/amis.service';
import { Amis } from 'src/app/interfaces/amis/amis';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  likeicon=false;
  selectedFile:any;
  text = "";
  posts:Array<Post> = [];
  likes:Array<any> = [];
  amis:Array<Amis>=[];
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
  profilImage:string="../assets/img/icons8-user-100.png";

  backgroundProfilImage:string='background-image: url("'+this.profilImage+'")';

  email:string=localStorage.getItem('email')+'';


  constructor(private amisService:AmisService,private profilService:ProfilService,private postService:PostService,private commentaireService:CommentaireService,private likeService:LikeService,private storage: AngularFireStorage,private router:Router) { }

  ngOnInit(): void {

    this.likes=[];
    this.amisService.getAbonnementByUtilisateur(this.email).then(
      (response:any) => {
        console.log("response");
        this.amis=response.data;
        console.log(this.amis);


        this.postService.getPosts().then((result:any)=>{
          result.data.forEach((post:any) => {
            /*console.log("for");
            console.log(post);*/
            
            this.commentaireService.getCommentairesByPost(post.ID_POST).then(
              (resultat:any)=>{
                //console.log(resultat);
                post.COMMENTAIRES=[];
                post.COMMENTAIRES.push(resultat.data);
                //console.log(post);
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
                //console.log(post);
                this.posts.filter(post=>{post.USER_LIKE='favorite_border'});
              }
            ).catch(
              (error) =>{
                console.log(error);
              }
            )
            
          });
    
          this.likeService.getLikesByUser(localStorage.getItem('email')+'').then(
            (res:any)=>{
              if(res.data!=undefined){
                
                this.likes.push(res.data);
                ///console.log(this.likes);
                ///console.log("likes kaynine");
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
                //console.log(res);
                //console.log("likes makayninech");
              }
            }
          )
          console.log(this.posts);
          this.amis.forEach((ami:any)=>{
            
            result.data.forEach((data:any,index:number)=>{
              if(ami.EMAIL_UTILISATEUR2==data.EMAIL_UTILISATEUR){
                this.posts.push(result.data?.[index])
                console.log(1)
                console.log(this.posts);
                
              }
              
            })
          })

          //result.data=result.data.filter((post:any) => post.EMAIL_UTILISATEUR)
          //this.posts=result.data;
    
    
          
        }).catch(
          (err) =>{
            console.log(err);
          }
        )

      }
    ).catch(
      (error:any) => {
        console.log(error);
      }
    )
    
    

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
    let emails=[this.email];
    this.profilService.getProfilByListOfEmails(emails).then((res:any)=>{
      this.profilImage=res.data[0].PHOTO_DE_PROFIL;

      console.log("profil");
      console.log(res.data[0].PHOTO_DE_PROFIL);
        if(this.selectedFile==null || this.selectedFile==undefined){
        this.myPost ={
          EMAIL_UTILISATEUR:localStorage.getItem('email')+'',
          NOM_PROFIL:localStorage.getItem('username')+'',
          TEXT:this.text,
          IMAGE_URL:"",
          COUNT_COMMENT:0,
          COUNT_LIKE:0,
          LIKES:[],
          COMMENTAIRES:[],
          DATE_POST:new Date().toLocaleString(),
          USER_LIKE:'favorite_border',
          PHOTO_DE_PROFIL:this.profilImage
        }
        
        this.postService.createNewPost(this.myPost).then((res)=>{
          console.log(this.myPost)
          this.posts.push(this.myPost);
          this.text="";
          
          console.log("ajout succées");
        })
        
      }else{
        this.uploadImage().then((imageUrl)=>{
          this.myPost={
            EMAIL_UTILISATEUR:localStorage.getItem('email')+'',
            NOM_PROFIL:localStorage.getItem('username')+'',
            TEXT:this.text,
            IMAGE_URL:imageUrl+"",
            COUNT_COMMENT:0,
            COUNT_LIKE:0,
            LIKES:[],
            COMMENTAIRES:[],
            DATE_POST:new Date().toLocaleString(),
            USER_LIKE:'favorite_border',
            PHOTO_DE_PROFIL:this.profilImage
          }
          
          this.postService.createNewPost(this.myPost).then((res)=>{
            console.log(this.myPost)
            this.posts.push(this.myPost);
            this.text="";
            console.log("ajout succées");
            
          })
        })
      }
    })
    
  }




  like(idPost:any,i:number){
    this.likeicon = !this.likeicon;
    this.likeService.getLikeByUserAndByPost(idPost,localStorage.getItem('email')+"").then(
      (res:any)=>{
        if(res.data==undefined){
          let myLike:Like={
            EMAIL_UTILISATEUR:localStorage.getItem('email')+"",
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
      EMAIL_UTILISATEUR:localStorage.getItem('email')+'',
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
          console.log(this.posts);
        }

      }
    )
  }



}
