import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iprofil } from 'src/app/interfaces/profil/iprofil';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  displayhome=false;
  searchList:any[] =[];
  resultSearchList:any[] =[];
  searchText:string ="";
  utilisateurNom:string ="";

  constructor(public router:Router, private templateService:TemplateService,private profilService:ProfilService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }
  

  ngOnInit(): void {
    this.utilisateurNom=localStorage.getItem('username')+"";
    console.log(this.router.url)
    if(this.router.url=='/home') {
      this.displayhome=true;
    }else{
      this.displayhome=false;
    }

  }

  rechercher(){
    this.searchList=[];
    this.resultSearchList=[];
    if(this.searchText==""){
      return;
    }
    this.profilService.getProfils().then((res:any)=>{
      this.searchList=res.data;
      this.resultSearchList=this.searchList.filter(s=>s.NOM_UTILISATEUR.toLowerCase().indexOf(this.searchText.toLowerCase())!==-1);
    }).catch((err)=>{
      console.log(err);
    })
  }

  clear(){
    if(this.searchText==""){
      this.searchList=[];
      this.resultSearchList=[];
    }
  }

  versProfil(name: string){
    localStorage.setItem('emailVersProfil',name);
    this.searchText="";
    this.searchList=[];
    this.resultSearchList=[];
    this.router.navigate(['/profil']);
  }



  vers(){
    if(localStorage.getItem('email')!=null || localStorage.getItem('email')!=undefined){
      this.router.navigate(['/posts']);
    }else{
      this.router.navigate(['/home']);
    }
  }

  deconnection() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  profil(){
    console.log("profil")
    localStorage.removeItem('emailVersProfil');
    this.router.navigate(['/profil']);
    
  }


}
