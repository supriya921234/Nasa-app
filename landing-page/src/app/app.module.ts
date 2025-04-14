import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service'; // Import AuthService

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
  ],
  providers: [
    AuthService, // Add AuthService to providers
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}