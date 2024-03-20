import { Component, OnInit ,Input} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal,NgbModalOptions  } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { AddgroupComponent } from '../addgroup/addgroup.component';
import { EditgroupComponent } from '../editgroup/editgroup.component';
@Component({
  selector: 'app-middle-section',
  templateUrl: './middle-section.component.html',
  styleUrls: ['./middle-section.component.css']
})
export class MiddleSectionComponent implements OnInit { 
  groups: any[] = [];
  groupData:any;
  filteredGroups: any[] = [];
  // isEditMode: boolean = false;
  // noEditMode : boolean = false;
  constructor(private modalService: NgbModal, private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groups = this.localStorageService.getData('groups') || [];
    this.filteredGroups = [...this.groups]; 
    console.log("Groups: " + this.groups + "filtered groups :" + this.filteredGroups  )
  }
  onFormSubmitted() {
    // this.isEditMode = false;
    this.groupData = null;
    this.groups = this.localStorageService.getData('groups') || [];
    this.filteredGroups = [...this.groups]; 
  }

  onSearch(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredGroups = this.groups.filter(group => 
        group.groupName.toLowerCase().includes(value.toLowerCase()) ||
        group.legalName.toLowerCase().includes(value.toLowerCase())        
    );

    
  }
  
  openEditMode(group: any) {        
    // this.isEditMode = true;
    this.groupData = { ...group };
  }
  openAdd(){
    // debugger;
    const modalOptions: NgbModalOptions = {
      // animation:true,
      // backdrop: 'static', 
      // keyboard: false, 
      windowClass: 'modal right fade' 
  };
    const modalRef = this.modalService.open(AddgroupComponent, modalOptions);
    modalRef.componentInstance.formSubmitted?.subscribe(() => {
   
      console.log('Form submitted from AddgroupComponent');
      this.onFormSubmitted();
     
      modalRef.dismiss('Close click');
     
    });
    modalRef.componentInstance.name = 'add';
  }
  openEdit(group: any){
    this.groupData = { ...group };
    const modalOptions: NgbModalOptions = {
      // animation:true,
      // backdrop: 'static', 
      // keyboard: false, 
      windowClass: 'modal right fade' 
  };
    const modalRef = this.modalService.open(EditgroupComponent,modalOptions);
    modalRef.componentInstance.groupData = this.groupData; 

    modalRef.componentInstance.formSubmitted?.subscribe(() => {
      
      console.log('Form submitted from AddgroupComponent');
      this.onFormSubmitted();
     
      modalRef.dismiss('Close click');
    
    });
    modalRef.componentInstance.name = 'edit';
    
  }
  deleteGroup(group: any){
    const index = this.groups.indexOf(group);
    if (index !== -1) {
        this.groups.splice(index, 1);       
        this.localStorageService.saveData('groups', this.groups);
    }
    this.onFormSubmitted();   
  }
}