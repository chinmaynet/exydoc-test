// import { Directive ,OnChanges,
//   OnInit,
//   ElementRef,
//   HostListener,
//   Input,} from '@angular/core';
//   import { FormGroup } from '@angular/forms';
//   import moment from 'moment';
// @Directive({
//   selector: '[appDate]'
// })
// export class DateDirective {
//   @Input('form') form!: FormGroup;
//   @Input('controlName') controlName!: string;
//   constructor(private e: ElementRef) {}

//   @HostListener('ngModelChange', ['$event']) dateChange(value:any) {
//     console.log('blur');
//     const year = value.year;
//     const date = value.day;
//     const month = value.month;
//     let newDate = new Date(year, month - 1, date);
//     let fdate = moment(newDate).format('YYYY-MM-DD');
//     this.form.get(this.controlName)?.setValue(fdate);
//   }
// }
