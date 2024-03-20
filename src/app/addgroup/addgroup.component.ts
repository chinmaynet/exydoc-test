import { Component, OnInit, NgZone, Directive, inject } from '@angular/core';
import { Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { TagsChangedEvent } from 'ngx-tags-input';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'console';
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})

export class AddgroupComponent implements OnInit {

  submitted: boolean = false;
  groupForm: FormGroup;
  formData: any = {};
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  constructor(private el: ElementRef, private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public activeModal: NgbActiveModal, private ngZone: NgZone) {
    this.groupForm = this.fb.group({
      // groupId: ['', Validators.required], 
      groupName: ['', Validators.required],
      groupStatus: ['', Validators.required],
      ttyNumber: [[]],
      // taxId: ['', [Validators.pattern(/^(?!0)[0-9]{10}$/)]],
      taxId: ['', [Validators.pattern(/^[1-9][0-9]{9}$/)]],
      legalName: ['', Validators.required],
      dbaName: [''],
      effectivedate: ['', [Validators.required]],
      endeffectivedate: ['', [Validators.required]],
      medicareId: [''],

      // medicareeffectivedate: [''],
      // medicareexpiredate: ['']
    }, {
      validator: [this.dateOrderValidator, this.uniqueTtyNumberValidator]  //custom validators, second argument to the group method
    }
    );
  }

  uniqueTtyNumberValidator(group: FormGroup): ValidationErrors | null {
    
    
    //  debugger;
    const ttyNumbers = group.get('ttyNumber')?.value;
    if (Array.isArray(ttyNumbers)) {    //chech if ttynumbers iss an array , array is chech is  crucial because operations mapping and set creation.
      const values = ttyNumbers.map((item: any) => item.displayValue);
      const uniqueValues = new Set(values); // set only allows unique values

      if (uniqueValues.size < ttyNumbers.length) {
        // this.removeDuplicate(group);
        return { 'duplicateTtyNumber': true };
      }
    }
    return null;
  }


  // @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
  //   // debugger;
  //   const inputElement = this.el.nativeElement as HTMLInputElement;
  //   if (inputElement.id === 'taxId') {
  //     const keyCode = event.keyCode;
  //     // Allows only numeric characters (0-9) and special keys like Backspace, Delete, Arrow keys, etc.
  //     if ((keyCode < 48 || keyCode > 57) && !event.ctrlKey && keyCode !== 8 && keyCode !== 9 && keyCode !== 37 && keyCode !== 39) {
  //       event.preventDefault();
  //     }
  //   }
  // }
  dateOrderValidator(group: FormGroup): ValidationErrors | null {
    const effectiveDate = group.get('effectivedate')?.value;
    const endEffectiveDate = group.get('endeffectivedate')?.value;

    if (effectiveDate && endEffectiveDate) {

      const effectiveTime = new Date(effectiveDate.year, effectiveDate.month - 1, effectiveDate.day).getTime();
      const endEffectiveTime = new Date(endEffectiveDate.year, endEffectiveDate.month - 1, endEffectiveDate.day).getTime();

      if (!isNaN(effectiveTime) && !isNaN(endEffectiveTime)) {
        if (effectiveTime > endEffectiveTime) {
          return { dateOrder: true };
        }
      } else {

        return { invalidDate: true };
      }
    }
    return null;
  }

  ngOnInit(): void {
    // debugger
  }
  onSubmit() {
    // debugger;
    // console.log(this.tagsInput);

    this.submitted = false;
    if (this.groupForm.errors || (this.groupForm.get('groupName')?.errors || this.groupForm.get('groupStatus')?.errors || this.groupForm.get('taxId')?.errors || this.groupForm.get('legalName')?.errors || this.groupForm.get('effectivedate')?.errors || this.groupForm.get('endeffectivedate')?.errors)) {
      this.submitted = true;
    }
    else if (this.groupForm.valid) {
      let groups = this.localStorageService.getData('groups') || [];
      groups.push(this.groupForm.value);
      this.localStorageService.saveData('groups', groups);

      // this.submitted = false;
      // this.router.navigate(['/']);
      this.cancelForm();
      this.formSubmitted.emit();
      // this.router.navigate(['/']);

      // this.activeModal.dismiss('Cross click');
      // document.querySelector('.modal-backdrop')?.classList.remove('show');
      // const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLElement;
      // if (modalBackdrop) {
      //   modalBackdrop.style.display = 'none';
      // }

    }


  }
  cancelForm() {
    this.groupForm.reset();
    this.submitted = false;
    this.router.navigate(['/']);
  }

  //tty-number tags input
  name = 'Tags input';
  tagsInput: string[] = [];
  placeholder = 'Enter TTY tags';
  // displayTags(tag: any) {
  //   debugger;
  //   // this.removeDuplicate(this.groupForm);
  //   if (tag.change == 'add') {

  //     this.tagsInput.push(tag);
  //   }
  //   else {
  //     this.tagsInput.splice(tag);
  //   }
  //   // this.tagsInput = tag;
  // }
  duplicateRemoved : boolean = false;
  duplicateTags(tag: any) {

    //for avoiding duplicate tags in ttynumber.
    //1.  removed added tag in tags 
    //2. if duplicate found in tags wrp to tag then remove og in tags 
    //3.  push tag in tags

    debugger;
    this.duplicateRemoved = false;
    const ttyNumberControl = this.groupForm.get('ttyNumber');
    if (tag.change == 'add') {
      const tags = ttyNumberControl?.value || [];

      // Remove added tag
      const indexToRemove = tags.findIndex((existingTag: any) => existingTag.displayValue === tag.tag.displayValue);
      if (indexToRemove !== -1) {
        tags.splice(indexToRemove, 1);
      }
      // Check if the tag is already present in the list of tags
      const isDuplicate = tags.some((existingTag: any) => existingTag.displayValue === tag.tag.displayValue);

      if (isDuplicate) {
        const indexToRemove = tags.findIndex((existingTag: any) => existingTag.displayValue === tag.tag.displayValue);
        if (indexToRemove !== -1) {
          tags.splice(indexToRemove, 1);
          this.duplicateRemoved = true;
        }
      }
      // Add the new tag to the list 
      tags.push(tag.tag);

      // Update the form control value
      ttyNumberControl?.setValue(tags);
    }
  }
//using set
//   displayTags(tag: any) {
//     debugger;
//     const ttyNumberControl = this.groupForm.get('ttyNumber');
//     if (tag.change == 'add') {
//         const tags = ttyNumberControl?.value || [];

//         const indexToRemove = tags.findIndex((existingTag: any) => existingTag.displayValue === tag.tag.displayValue);
//             if (indexToRemove !== -1) {
//                 tags.splice(indexToRemove, 1);
//                 ttyNumberControl?.setValue(tags);
//             }

//         const values = tags.map((item: any) => item.displayValue);
//         const uniqueValues = new Set(values); 

//         // Check if the tag is already present in the list of tags
//         const isDuplicate = uniqueValues.has(tag.tag.displayValue);

//         if (isDuplicate) {
//             // If the tag is a duplicate, remove it from the list
//             const indexToRemove = tags.findIndex((existingTag: any) => existingTag.displayValue === tag.tag.displayValue);
//             if (indexToRemove !== -1) {
//                 tags.splice(indexToRemove, 1);
//                 ttyNumberControl?.setValue(tags); 
//             }
//             tags.push(tag.tag);
//             ttyNumberControl?.setValue(tags); 
//         } else {
//             // If the tag is not a duplicate, add it to the list
//             tags.push(tag.tag);
//             ttyNumberControl?.setValue(tags); 
//         }
//     }
// }




  //   public onSelect(item:any) {
  //     console.log('tag selected: value is ' + item);
  // }

  // removeDuplicate(group: FormGroup) {
  //   const ttyNumbers = group.get('ttyNumber')?.value; // Get the value of ttyNumber form control
  //   if (Array.isArray(ttyNumbers)) { // Check if it's an array
  //     const uniqueValues = new Set(ttyNumbers.map((item: any) => item.displayValue)); // Convert the array to a Set to remove duplicates
  //     const uniqueTtyNumbers = [...uniqueValues].map(value => ({ displayValue: value })); // Convert the Set back to an array while maintaining the order
  //     group.get('ttyNumber')?.setValue(uniqueTtyNumbers); // Set the unique array back to the ttyNumber form control
  //   }
  // }
}
