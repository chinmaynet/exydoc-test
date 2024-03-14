import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  // @ViewChild ('rightModal', {static :false}) rightModal?:ElementRef;
  @ViewChild('rightModal') rightModal!: ElementRef;
  @ViewChild('rightModalDialog', { static: false }) rightModalDialog?: ElementRef;
  @Output() clickOutside = new EventEmitter<void>();
  submitted: boolean = false;
  groupForm: FormGroup;
  formData: any = {};
  @Input() isEditMode!: boolean;
  @Input() groupData: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder) {

    this.groupForm = this.fb.group({
      // groupId: ['', Validators.required], 
      groupName: ['', Validators.required],
      groupStatus: ['', Validators.required],
      ttyNumber: [''],
      // taxId: ['', [Validators.pattern(/^(?!0)[0-9]{10}$/)]],
      // taxId: ['', [Validators.pattern(/^[1-9][0-9]{9}$/)]],
      taxId: ['', [Validators.pattern(/^((?!(0))[0-9]{10})$/)]],
      

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

  // dateOrderValidator(group: FormGroup): ValidationErrors | null {
  //   const effectiveDate = group.get('effectivedate')?.value;
  //   const effectiveDateDay = effectiveDate?.day;
  //   const effectiveDateMonth = effectiveDate?.month;
  //   const effectiveDateYear = effectiveDate?.year;
  //   const endEffectiveDate = group.get('endeffectivedate')?.value;
  //   const endEffectiveDateDay = endEffectiveDate?.day;
  //   const endEffectiveDateMonth = endEffectiveDate?.month;
  //   const endEffectiveDateYear = endEffectiveDate?.year;
   
  //   if (effectiveDateYear < endEffectiveDateYear) {
  //     return null; 
  //   } else if (effectiveDateYear > endEffectiveDateYear) {
  //     return { dateOrder: true }; 
  //   }

    
  //   if (effectiveDateMonth < endEffectiveDateMonth) {
  //     return null; 
  //   } else if (effectiveDateMonth > endEffectiveDateMonth) {
  //     return { dateOrder: true }; 
  //   }

    
  //   if (effectiveDateDay < endEffectiveDateDay) {
  //     return null; 
  //   } else if (effectiveDateDay > endEffectiveDateDay) {
  //     return { dateOrder: true }; 
  //   }    
  //   return null; 
  // }
  dateOrderValidator(group: FormGroup): ValidationErrors | null {
    const effectiveDate = group.get('effectivedate')?.value;
    const endEffectiveDate = group.get('endeffectivedate')?.value;
  
    // Check if effectiveDate and endEffectiveDate are valid objects
    if (effectiveDate && endEffectiveDate) {
      debugger;
      const effectiveTime = new Date(effectiveDate.year, effectiveDate.month - 1, effectiveDate.day).getTime();
      const endEffectiveTime = new Date(endEffectiveDate.year, endEffectiveDate.month - 1, endEffectiveDate.day).getTime();
  
      if (!isNaN(effectiveTime) && !isNaN(endEffectiveTime)) {
        if (effectiveTime > endEffectiveTime) {
          return { dateOrder: true }; 
        }
      } else {
        // Handle invalid date format
        return { invalidDate: true };
      }
    }
    
    return null; 
  }
  
  
  

  ngOnInit(): void {
    // this.isEditMode=true;
    if (this.isEditMode) {
      this.groupForm.patchValue(this.groupData);
      // this.formData = { ...this.groupData }; 
    }

   
    
  }
  // @HostListener('document:click', ['$event'])
  // clickOutside(event: MouseEvent) {
  //   debugger

  //   const targetElement = event.target as HTMLElement;
  //   const modalBody = document.querySelector('#rightModal') as HTMLElement;
  //   const isFormControl = targetElement.classList.contains('form-control') || targetElement.tagName === 'INPUT';
  //   const isCustomElement = targetElement.classList.contains('modal-body');
  //   const formGroup = targetElement.classList.contains('form-row')

  //   //const custom = customBody.classList.contains('form-control')
  //   if (modalBody && modalBody.contains(targetElement) && !formGroup && !isFormControl  && !isCustomElement && !this.submitted )  {
  //     this.cancelForm();
  //   }
  // }
  // @HostListener('document:click', ['$event'])
  // clickOutside(event: MouseEvent) {
  //   if (this.rightModalDialog && !this.rightModalDialog.nativeElement.contains(event.target)) {
  //     this.cancelForm();
  //   }
  // }
  

  onSubmit() {
    // if (!this.groupForm.valid) {
    //   this.submitted = true;
    // }
    // else {
    //   this.submitted = false;
    // }
    // if (this.groupForm.valid) {
    //   let groups = this.localStorageService.getData('groups') || [];
    //   groups.push(this.groupForm.value);
    //   this.localStorageService.saveData('groups', groups);
    //   this.formSubmitted.emit();
    //   this.groupForm.reset();
    // }   
    
    this.submitted = false;   
     if (this.groupForm.errors || ( this.groupForm.get('groupName')?.errors || this.groupForm.get('groupStatus')?.errors  || this.groupForm.get('taxId')?.errors || this.groupForm.get('legalName')?.errors || this.groupForm.get('effectivedate')?.errors || this.groupForm.get('endeffectivedate')?.errors)){               
       this.submitted = true;   
     } 
    else if (this.groupForm.valid) {
      let groups = this.localStorageService.getData('groups') || [];
      groups.push(this.groupForm.value);
      this.localStorageService.saveData('groups', groups);
      this.formSubmitted.emit();
      this.groupForm.reset();
    }   
  }

  updateGroup() {
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
      const index = groups.findIndex((group: any) => group.groupName === this.groupData.groupName);

      if (index !== -1) {
        // groups[index] = this.groupForm.value;
         groups[index] = updatedGroup;
        this.localStorageService.saveData('groups', groups);
        this.formSubmitted.emit();
      }
      this.groupForm.reset();
    }

  }
  cancelForm() {
    

    this.submitted = false;    
    this.isEditMode = false;
    this.groupData = {};
    // this.formData={};
    this.formSubmitted.emit();
   
    this.groupForm.reset();
      document.querySelector('.modal-backdrop')?.classList.remove('show');
    // this.ngOnInit();
  }
 
}
