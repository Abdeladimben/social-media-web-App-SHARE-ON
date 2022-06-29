import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleterProfilComponent } from './components/completer-profil/completer-profil.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfilComponent } from './components/profil/profil/profil.component';

const routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'completerProfil',component:CompleterProfilComponent},
  {path:'posts',component:PostsComponent},
  {path:'profil',component:ProfilComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes ,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
