import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiddleSectionComponent } from './middle-section/middle-section.component';
import { TestsComponent } from './tests/tests.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { EditgroupComponent } from './editgroup/editgroup.component';


const routes: Routes = [
  {path :'', component: MiddleSectionComponent},  
  {path :'test', component: TestsComponent},  
  { path: 'groups/add', component: AddgroupComponent },
  { path: 'groups/edit/:groupName', component: EditgroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
