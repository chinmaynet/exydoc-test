import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MiddleSectionComponent } from './middle-section/middle-section.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
// import { MatFormFieldModule } from '@angular/material/form-field';
import { TestsComponent } from './tests/tests.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { OnlyNumericDirective } from './only-numeric.directive';
// import { NgxTagsInputModule } from 'ngx-tags-input';
import { TagsChangedEvent } from 'ngx-tags-input';
import { NgxTagsInputModule } from 'ngx-tags-input';

// import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
// import {MatIconModule} from '@angular/material/icon';
// import { MatFormField } from '@angular/material/form-field';
// import { MatLabel } from '@angular/material/form-field';
// import { MatChipGrid } from '@angular/material/chips';
// import { MatChipRow } from '@angular/material/chips';
// import { MatIcon } from '@angular/material/icon';
@NgModule({
  imports: [
    // MatFormFieldModule,
    
    FormsModule,
    // MatChipsModule,
    // MatIconModule,
  ],
  // Other module properties...
})
export class YourAppModule { }


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
    OnlyNumericDirective,
    // DateDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    // ,NgxTagsComponent,
    //  NgxTagsInputModule
    NgxTagsInputModule
    // ,MatFormField,MatLabel,MatChipGrid,MatChipRow,MatIcon    
  ],
  providers: [
    // {provide: NgbDateParserFormatter, useClass: MomentDateFormatter}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
