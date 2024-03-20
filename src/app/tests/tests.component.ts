import { Component, OnInit } from '@angular/core';
// import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Console, error } from 'console';
// import {LiveAnnouncer} from '@angular/cdk/a11y';
import { inject} from '@angular/core';
import { visitAll } from '@angular/compiler';
// import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
// import {MatIconModule} from '@angular/material/icon';
// import {MatFormFieldModule} from '@angular/material/form-field';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    examplelet();
    exampleconst();
    console.log(calculateTax(75_000));
  }



  addOnBlur = true;
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  // announcer = inject(LiveAnnouncer);

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push({name: value});
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  // remove(fruit: Fruit): void {
  //   const index = this.fruits.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);

  //     this.announcer.announce(`Removed ${fruit}`);
  //   }
  // }

  // edit(fruit: Fruit, event: MatChipEditedEvent) {
  //   const value = event.value.trim();

  //   // Remove fruit if it no longer has a name
  //   if (!value) {
  //     this.remove(fruit);
  //     return;
  //   }

  //   // Edit existing fruit
  //   const index = this.fruits.indexOf(fruit);
  //   if (index >= 0) {
  //     this.fruits[index].name = value;
  //   }
  // }
}
var v = 2;
v = 3;

const c = 2;

let a = 2;
a = 1;

if(true){
  let b =122;  
}
// console.log(b); //error

let sales = 123_132_123;
console.log(sales);

function something(document: any) {
  console.log(document);
}

var numbers = [1, 2, 3];
for (var i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}


function exampleconst() {
  const x = 10;
  // x=1;      //error  no redeclaration
  if (true) {
    const x = 20; // This creates a new variable scoped to this block
    console.log(x); // Outputs 20
  }
  console.log(x); // Outputs 10
}


function examplelet() {
  let x = 10;
  x = 15;
  if (true) {
    let x = 20; // This creates a new variable scoped to this block
    console.log(x); // Outputs 20
  }
  console.log(x); // Outputs 15
}

function examplevar() {
  var x = 10;
  if (true) {
    var x = 20; // This reassigns the value of the outer x
    console.log(x); // Outputs 20
  }
  console.log(x); // Outputs 20
}

var numbers: number[] = [10, 20, 30, 40, 50];
const index = numbers.findIndex((number: number) => number === 40)
console.log("index", index);

let userss: [number, string] = [1, 'Mosh'];
userss.push(1);
console.log("users", userss)



enum Size { Small = 1, Medium, Large };
let mySize: Size = Size.Medium;
console.log(mySize); // Output: Medium



function calculateTax(income: number, taxYear: number = 2022): number {
  // if((taxYear ||2022) < 50_000)
  if (taxYear < 2022)
    return income * 1.2;
  else {
    return income;
  }
  return 0;
}
calculateTax(75_000);
calculateTax(1_00000, 2026);

class Employee {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  retire(date: Date): void {
    console.log(date);
  }
}
const employeee = new Employee(1, "c");
employeee.retire(new Date());


//type aliase
type Emoloyee = {
  readonly id: number,
  name: string,
  retire: (date: Date) => void 
}
let employee:  Emoloyee= { 
  id: 1, 
  name: 'Hari', 
  retire : (date: Date) => {
    console.log(date);
}};
console.log("employee",employee.retire);

//union types 
function kgToLbs(weight : number | string ):number {
  if(typeof weight === 'number')
    return weight * 2;
  else {
    return parseInt(weight) * 2.2;
  }
}
console.log("kgToLbs",kgToLbs('120s'));
console.log("kgToLbs",kgToLbs(120));

type Draggable = {
  drag : ()=>void 
};
type Resizable = {
  resize : ()=>void 
};
type UIWidget = Draggable & Resizable; 
let textBox  : UIWidget = {
  drag : () =>{},
  resize : () =>{}
}

// let quantity : 12 | 22 = 21; //error
//literal
type Quantity = 50 |100;
let quantity : Quantity =100;
type Metric  = 'cm'  | 'inch';

//nullable types 
function greet(name : string | null | undefined){
  if(name){
    console.log(name.toUpperCase());
  }
  else{
    console.log("Hello");
  }
}
greet(null);  
greet(undefined); 
greet("Hari");


var cd:string ;
var dc = undefined;
var nu : null= null;
console.log("nu", nu);


type Customer = 
{
  birthday? :Date;
};

function getCustomer(id : number ) : Customer | null | undefined {
  return id === 0 ? null :{birthday : new Date()} ;

}

//optional chaining '?'
let cust = getCustomer(0);
// if(cust!==null && cust !== undefined){
  console.log("cust b-day ",cust?.birthday?.getFullYear());
// }



//18/03/2024
var count :number =5;
count =2;


//type assssertion 
let messsege; 
messsege = 'abc';
let endsWithC = (<string>messsege).endsWith('c');
let alternativeWay = (messsege as string).endsWith('c');



const indexx = (<string>messsege);
console.log("indexx",indexx)
//arrow function
let doLog = (messsege:string , action:string) => {console.log(messsege)};


class Point {
 public x:number;
 private y:number;

  /**
   *
   */
  constructor() {
    this.x=1;
    this.y=1;
  }

  draw () : void{
    console.log("x: "+ this.x +', Y: ' + this.y);
  }
  
  getDistance(another:Point){    
    const distanceX = this.x - another.x;
    const distanceY = this.y - another.y;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  }

  get X(){
    return this.x;
  }
  set X(value:number){
    if(value< 0 )
      throw new Error('value cannot be lesss than 0.');

      this.x = value;
  }

}

let point: Point = new Point();
// point.x=2;
// point.y=2;


let x = point.X;  //get
point.X= 12;               //set

console.log("point", point);
const anotherPoint: Point = new Point();
console.log("point2", anotherPoint);
const distance = point.getDistance(anotherPoint);

console.log("Distance between points: ", distance);


const originalObject = { name: 'John', age: 30, address: { city: 'New York' } };
// const shallowCopy = originalObject;// shallow copy of originalObject , references to the nested objects or arrays are copied
const shallowCopy = {...originalObject};

shallowCopy.name ="anil";
console.log("originalObject.name ", originalObject.name);