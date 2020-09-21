/**
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ThemeService } from './theme.service';
import { RoutePartsService } from './router-parts.service';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent,
    ToolbarComponent
  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    LayoutComponent,
    ToolbarComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [],
  providers: [
    RoutePartsService,
    ThemeService
  ]
})
export class UIModule { }
*/
