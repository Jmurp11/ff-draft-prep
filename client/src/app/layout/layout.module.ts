import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SidenavComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SidenavComponent
    ],
    imports: [
        SharedModule
    ]
})
export class LayoutModule { }