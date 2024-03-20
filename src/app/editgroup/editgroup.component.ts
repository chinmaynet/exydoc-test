import { Component, OnInit, Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  @Input() groupData: any;
  // groupData : any;
  // @ViewChild ('rightModal', {static :false}) rightModal?:ElementRef;

  submitted: boolean = false;
  groupForm!: FormGroup;
  formData: any = {};

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public activeModal: NgbActiveModal,) {
    this.initForm();
  }



  ngOnInit(): void {
    // this.initForm();
    if (this.groupData) {
      this.populateForm();
    }
  }
  private populateForm(): void {
    this.groupForm.patchValue({
      groupName: this.groupData.groupName,
      groupStatus: this.groupData.groupStatus,
      ttyNumber: this.groupData.ttyNumber,
      taxId: this.groupData.taxId,
      legalName: this.groupData.legalName,
      dbaName: this.groupData.dbaName,
      effectivedate: this.groupData.effectivedate,
      endeffectivedate: this.groupData.endeffectivedate,
      medicareId: this.groupData.medicareId
    });
  }
  private initForm(): void {
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
    }
      , { validator: [this.dateOrderValidator, this.uniqueTtyNumberValidator] }
    );
  }

  uniqueTtyNumberValidator(group: FormGroup): ValidationErrors | null {
    // debugger;
    const ttyNumbers = group.get('ttyNumber')?.value;
    if (Array.isArray(ttyNumbers)) {    //chech if ttynumbers iss an array , array is chech is  crucial because operations mapping and set creation.
      const values = ttyNumbers.map((item: any) => item.displayValue);
      const uniqueValues = new Set(values); // set only allows unique values

      if (uniqueValues.size < ttyNumbers.length) {
        return { 'duplicateTtyNumber': true };
      }
    }
    return null;
  }

  dateOrderValidator(group: FormGroup): ValidationErrors | null {
    const effectiveDate = group.get('effectivedate')?.value;
    const endEffectiveDate = group.get('endeffectivedate')?.value;

    if (effectiveDate && endEffectiveDate) {
      // debugger;
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

  loadGroupData(): void {
    const groupName = this.route.snapshot.paramMap.get('groupName'); // Assuming the parameter is 'groupName'
    // Retrieve group data by group name from local storage or an API
    if (groupName != null) {

      const groupData = this.localStorageService.getGroupDataByName(groupName); // Replace with your method to fetch data
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
      const index = groups.findIndex((group: any) => group.groupName === this.groupData.groupName);



      if (index !== -1) {
        // groups[index] = this.groupForm.value;
        groups[index] = updatedGroup;
        this.localStorageService.saveData('groups', groups);

        this.formSubmitted.emit();
      }

      this.groupForm.reset();
      // this.router.navigate(['/']);
    }
  }
  cancelForm() {
    debugger;
    this.groupForm.reset();
    this.submitted = false;

    this.activeModal.dismiss('Cross click');
    // this.router.navigate(['/']);
  }

  name = 'Tags input';
  tagsInput: string[] = [];
  placeholder = 'Enter TTY tags';
  duplicateRemoved: boolean = false;


  // displayTags(tag: any) {
  //   debugger;

  //   if (tag.change == 'add') {

  //     this.tagsInput.push(tag);
  //   }
  //   else {
  //     this.tagsInput.splice(tag);
  //   }
  //   // this.tagsInput = tag;
  // }
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
}
