import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as moment from 'moment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Iprofil } from 'src/app/interfaces/profil/iprofil';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { TemplateService } from 'src/app/services/template/template.service';
@Component({
  selector: 'app-completer-profil',
  templateUrl: './completer-profil.component.html',
  styleUrls: ['./completer-profil.component.css']
})
export class CompleterProfilComponent implements OnInit {


 profilForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(6)]],
    adresse:['',Validators.required],
    genre:['',Validators.required],
    date_naissance:['',Validators.required]
  })


  genres: any[] = [
    {value: 'Masculin', viewValue: 'M'},
    {value: 'Féminin', viewValue: 'F'},
  ];


  photoProfilChecked: boolean = true;
  photoProfilStyle: string = 'background-image:url("assets\img\icons8-user-100.png")';
  selectedValue: string ="";

  selectedFile: any ;
  downloadURL: Observable<string> | undefined;
  urlImg:SafeHtml="assets\\img\\icons8-user-100.png";

  myProfil:Iprofil ={
    EMAIL:"",
    NOM_UTILISATEUR:"",
    PHOTO_DE_PROFIL:"",
    ADRESSE:"",
    GENRE:"",
    DATE_NAISSANCE:new Date(0)+""
  }

  constructor(private sanitizer: DomSanitizer,private fb:FormBuilder,private storage: AngularFireStorage,private router:Router,private profilService:ProfilService, private templateService:TemplateService) { }


 

  ngOnInit(): void {
    console.log(this.urlImg)
  }



  sendValue() {
    this.templateService.sendvalue(true);
  }


  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.urlImg=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.selectedFile));
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
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

  
  completer(){
    if(this.selectedFile != undefined || this.selectedFile != null){
      this.uploadImage().then((imageURL)=>{
        console.log(imageURL);
        this.myProfil = {
          EMAIL:localStorage.getItem('email')+"",
          NOM_UTILISATEUR:this.profilForm.value.username,
          PHOTO_DE_PROFIL:imageURL+"",
          ADRESSE:this.profilForm.value.adresse,
          GENRE:this.profilForm.value.genre,
          DATE_NAISSANCE:moment(new Date()).format('YYYY/MM/DD')
        };

        this.profilService.createNewProfil(this.myProfil).then((res)=>{
          console.log(res);
          localStorage.setItem('username',this.myProfil.NOM_UTILISATEUR);
          this.router.navigate(['/posts']);
        }).catch((err)=>{
          console.log(err);
        });
        this.selectedFile =null;
        
      }).catch((err)=>{
        console.log(err);
      })
    }
    else{
      this.myProfil = {
        EMAIL:localStorage.getItem('email')+"",
        NOM_UTILISATEUR:this.profilForm.value.username,
        PHOTO_DE_PROFIL:"",
        ADRESSE:this.profilForm.value.adresse,
        GENRE:this.profilForm.value.genre,
        DATE_NAISSANCE:moment(new Date()).format('YYYY/MM/DD')
      };
      this.profilService.createNewProfil(this.myProfil).then((res)=>{
        console.log(res);
        localStorage.setItem('username',this.myProfil.NOM_UTILISATEUR);
        this.router.navigate(['/posts']);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }





  ////        DATEDEBUT:moment(this.experienceForm.value.datedebut).format('YYYY/MM/DD')

}
