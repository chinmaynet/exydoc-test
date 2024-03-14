// import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
// import moment from 'moment';

// export class MomentDateFormatter extends NgbDateParserFormatter {

//     readonly DT_FORMAT = 'DD/MM/YYYY';

//     parse(value: string): NgbDateStruct {
//         if (value) {
//             value = value.trim();
//             let mdt = moment(value, this.DT_FORMAT);
//             if (mdt.isValid()) {
//                 return { year: mdt.year(), month: mdt.month() + 1, day: mdt.date() };
//             }
//         }
//         // Return a default NgbDateStruct if the parsing fails or value is null/empty
//         let mdt = moment(value, this.DT_FORMAT);
//         return { year: mdt.year(), month: mdt.month() + 1, day: mdt.date() };
//     }

//     format(date: NgbDateStruct): string {
//         if (!date) return '';
//         let mdt = moment([date.year, date.month - 1, date.day]);
//         if (!mdt.isValid()) return '';
//         return mdt.format(this.DT_FORMAT);
//     }
// }
