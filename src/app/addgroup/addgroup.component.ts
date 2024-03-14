import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  submitted: boolean = false;
  groupForm: FormGroup;
  formData: any = {};
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
    debugger
  }
  onSubmit() {
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
      this.router.navigate(['/']);
      document.querySelector('.modal-backdrop')?.classList.remove('show');
      const modalBackdrop = document.querySelector('.modal-backdrop') as HTMLElement;
      if (modalBackdrop) {
        modalBackdrop.style.display = 'none';
      }

    }


  }
  cancelForm() {
    this.groupForm.reset();
    this.submitted = false;
    this.router.navigate(['/']);
  }
}
