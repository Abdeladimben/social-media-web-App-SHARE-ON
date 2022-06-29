import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TemplateService } from './services/template/template.service';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'share_on';
  background:string='background-image: url("/assets/img/backgroundPost.svg")';
  show=false;
  //subscription: Subscription;
  constructor(public router:Router,private templateService:TemplateService) {
    // subscribe to home component messages
    /*this.subscription = this.templateService.onValue().subscribe(value => {
        this.show=value;
    });*/
    
    

    
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((event:any) => {
        if(this.router.url=='/home' || this.router.url=='/completerProfil'){
          this.show=false;
          console.log(this.router.url)
        }else{
          this.show=true;
        }
        console.log(this.show);
      });
  }

}
