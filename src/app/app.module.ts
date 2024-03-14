import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MiddleSectionComponent } from './middle-section/middle-section.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TestsComponent } from './tests/tests.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { EditgroupComponent } from './editgroup/editgroup.component';




// import { DateDirective } from './date.directive';
// import { MomentDateFormatter } from './momentdate';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MiddleSectionComponent,
    ModalComponent,
    FooterComponent,
    TestsComponent,
    AddgroupComponent,
    EditgroupComponent,    
    // DateDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    // {provide: NgbDateParserFormatter, useClass: MomentDateFormatter}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
