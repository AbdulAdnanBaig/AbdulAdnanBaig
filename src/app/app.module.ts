import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './home/form/form.component';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './home/chat/chat.component';
import { NgxUploaderModule } from 'ngx-uploader';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatCheckboxModule,
    NgxUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent, ChatComponent]
})
export class AppModule { }
