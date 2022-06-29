import { Component, OnInit } from '@angular/core';
import { Amis } from 'src/app/interfaces/amis/amis';
import { AmisService } from 'src/app/services/amis/amis.service';
import { ProfilService } from 'src/app/services/profil/profil.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  
  username: string="";
  listAmis:any[] = [];

  constructor(private amisService: AmisService,private profilService:ProfilService) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('username')+"";
    this.amisService.getAbonnementByUtilisateur(localStorage.getItem('email')+"").then((res:any) => {
      res.data.filter((a:Amis)=>{this.listAmis.push(a.EMAIL_UTILISATEUR2)});
      
    })


  }

}
