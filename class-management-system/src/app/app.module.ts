import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot({bgsColor: '#3498db', // Background spinner color
      bgsOpacity: 0.5, // Background opacity
      bgsPosition: 'bottom-right', // Background spinner position
      bgsSize: 60, // Background spinner size
      bgsType: 'ball-spin-clockwise', // Background spinner type
      fgsColor: '#2563EB', // Foreground spinner color
      fgsType: 'cube-grid', // Foreground spinner type
      pbThickness: 5, // Progress bar thickness
      pbColor: '#3498db', // Progress bar color
      text: 'Loading...', // Text displayed below the loader
      textColor: '#3498db', // Text color
      textPosition: 'center-center' // Text position
      }),
    NgxUiLoaderHttpModule.forRoot({showForeground:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
