import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { FooterComponent } from './ui/footer/footer.component';

import { SharedModule } from './shared/shared.module';
import { NavHeaderComponent } from './ui/nav-header/nav-header.component';
import { NavContentComponent } from './ui/nav-content/nav-content.component';
import { SearchbarComponent } from './ui/searchbar/searchbar.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ToolbarComponent,
    LayoutComponent,
    FooterComponent,
    NavHeaderComponent,
    NavContentComponent,
    SearchbarComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    ProfileModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
