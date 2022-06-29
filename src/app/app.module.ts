import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireModule } from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { PostsComponent } from './components/posts/posts.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CompleterProfilComponent } from './components/completer-profil/completer-profil.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { environment } from 'src/environments/environment';
import { ProfilComponent } from './components/profil/profil/profil.component';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxImageCompressService} from "ngx-image-compress";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    TopBarComponent,
    SideNavComponent,
    PostsComponent,
    CompleterProfilComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    MaterialFileInputModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    MatTabsModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
