import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        SearchbarComponent
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SearchbarComponent
    ],
    imports: [
        SharedModule
    ]
})
export class LayoutModule { }
