import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { TemplateService } from 'src/app/services/template/template.service';
import { Iutilisateur } from 'src/app/interfaces/utilisateur/iutilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ProfilService } from 'src/app/services/profil/profil.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  loginShow=true;
  myUtilisateur:Iutilisateur ={
    EMAIL:'',
    NOM:'',
    PRENOM:'',
    TELEPHONE:0,
    PASSWORD:''
  }

  constructor(private fb:FormBuilder,private router:Router, private templateService:TemplateService, private utilisateurService:UtilisateurService,private profilService:ProfilService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })

  createAccountForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    nom:['',[Validators.required,Validators.maxLength(15)]],
    prenom:['',[Validators.required,Validators.maxLength(15)]],
    password:['',[Validators.required,Validators.minLength(6)]],
    telephone:[undefined,[Validators.required,Validators.pattern('\\d{10}')]]
  })

  


  selectedValue: string='';
  types:any[]=['admin','utilisateur']
  @Output()  changePage = new EventEmitter<boolean>();

  sendValue() {
    this.templateService.sendvalue(true);
  }

  createAccount(){

    this.myUtilisateur={
      EMAIL:this.createAccountForm.value.email,
      NOM:this.createAccountForm.value.nom,
      PRENOM:this.createAccountForm.value.prenom,
      TELEPHONE:this.createAccountForm.value.telephone,
      PASSWORD:this.createAccountForm.value.password
    }

    this.utilisateurService.createNewUtilisateur(this.myUtilisateur).then((res:any) =>{
      console.log(res);
      this.utilisateurService.myUtilisateur=res;
      localStorage.setItem('email', this.myUtilisateur.EMAIL);      
      localStorage.setItem('password',this.myUtilisateur.PASSWORD);


      
      
    }).catch((err)=>{
      console.log(err);
    })
    this.router.navigate(['/completerProfil']);

  }




  login(){

    this.utilisateurService.getUtilisateur(this.loginForm.value.email).then((res:any)=>{
      console.log(res);
      this.utilisateurService.myUtilisateur=this.myUtilisateur=res.data[0];
      console.log(this.myUtilisateur);
      localStorage.setItem('email', this.myUtilisateur.EMAIL);      
      localStorage.setItem('password',this.myUtilisateur.PASSWORD);
    }).catch((err) => {
      console.log(err);
    })
    let listemails=[this.loginForm.value.email]
    
    this.profilService.getProfilByListOfEmails(listemails).then((res:any)=>{
      console.log("profil");
      console.log(res);
      if(res.data!=null){
        localStorage.setItem('username',res.data[0].NOM_UTILISATEUR);
        this.router.navigate(['/posts']);
      }else{
        this.router.navigate(['/completerProfil']);
      }
    }).catch((err) => {
      console.log(err);
    })


  }
  changeForm(){
    this.loginShow=!this.loginShow;
  }

}
