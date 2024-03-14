import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {

  // @ViewChild ('rightModal', {static :false}) rightModal?:ElementRef;
 
  submitted: boolean = false;
  groupForm: FormGroup;
  formData: any = {};
  groupData : any;
  
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {

    this.groupForm = this.fb.group({
      // groupId: ['', Validators.required], 
      groupName: ['', Validators.required],
      groupStatus: ['', Validators.required],
      ttyNumber: [''],
      // taxId: ['', [Validators.pattern(/^(?!0)[0-9]{10}$/)]],
      taxId: ['', [Validators.pattern(/^[1-9][0-9]{9}$/)]],
      legalName: ['', Validators.required],
      dbaName: [''],
      effectivedate: ['', [Validators.required]],
      endeffectivedate: ['', [Validators.required]],
      medicareId: [''],

      // medicareeffectivedate: [''],
      // medicareexpiredate: ['']
    }
      , { validator: this.dateOrderValidator }
    );

  } 

  dateOrderValidator(group: FormGroup): ValidationErrors | null {
    const effectiveDate = group.get('effectivedate')?.value;
    const effectiveDateDay = effectiveDate?.day;
    const effectiveDateMonth = effectiveDate?.month;
    const effectiveDateYear = effectiveDate?.year;
    const endEffectiveDate = group.get('endeffectivedate')?.value;
    const endEffectiveDateDay = endEffectiveDate?.day;
    const endEffectiveDateMonth = endEffectiveDate?.month;
    const endEffectiveDateYear = endEffectiveDate?.year;
   
    if (effectiveDateYear < endEffectiveDateYear) {
      return null; 
    } else if (effectiveDateYear > endEffectiveDateYear) {
      return { dateOrder: true }; 
    }

    
    if (effectiveDateMonth < endEffectiveDateMonth) {
      return null; 
    } else if (effectiveDateMonth > endEffectiveDateMonth) {
      return { dateOrder: true }; 
    }

    
    if (effectiveDateDay < endEffectiveDateDay) {
      return null; 
    } else if (effectiveDateDay > endEffectiveDateDay) {
      return { dateOrder: true }; 
    }    
    return null; 
  }

  ngOnInit(): void {
    debugger;
    this.loadGroupData();
  }      
  loadGroupData(): void {
    const groupName = this.route.snapshot.paramMap.get('groupName'); // Assuming the parameter is 'groupName'
    // Retrieve group data by group name from local storage or an API
    if(groupName!=null){

      const groupData = this.localStorageService.getGroupDataByName(groupName ); // Replace with your method to fetch data
      if (groupData) {
        
        this.groupForm.patchValue(groupData);
        this.formData = groupData;
      } else {
       
      }
    }
    
  }
  updateGroup() {
    debugger;
    if (!this.groupForm.valid) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
    }
    if (this.groupForm.valid) {

      let groups = this.localStorageService.getData('groups') || [];
      const updatedGroup = this.groupForm.value;


      // const index = groups.findIndex((group: any) => group.groupName === this.groupForm.value.groupName);
      const index = groups.findIndex((group: any) => group.groupName === this.formData.groupName);

      if (index !== -1) {
        // groups[index] = this.groupForm.value;
         groups[index] = updatedGroup;
        this.localStorageService.saveData('groups', groups);
        this.formSubmitted.emit();
      }
      this.groupForm.reset();
      this.router.navigate(['/']);
    }

  }
  cancelForm() {
    

    this.groupForm.reset();
    this.submitted = false;
    this.router.navigate(['/']);
  }
 
}
