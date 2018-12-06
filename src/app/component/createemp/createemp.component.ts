import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../../share/emp.ser'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-createemp',
  templateUrl: './createemp.component.html'
})
export class CreateempComponent implements OnInit {
  private title :any="Rakesh";
   @ViewChild('employee') employeeForm:NgForm;
  constructor(private _employeeService: EmployeeService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  id;
 name;
 apartmentName;
 buildingNumber;
 flatNumber;
 milkQuantity=1;;
 milkrate;
 phone;
 address;
 bills=[];
 
 
  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(" this.id ",this.id);
    if(this.id!=0){
     let employees=this._employeeService.setEmployee();
      console.log(employees);
      if(this.id!=0 && employees==undefined){
     
         this._router.navigate(['list']);
      }
     // this.employeeForm.patchValue({    
      this.name =employees.name;
       this.apartmentName =employees.apartmentName;
        this.buildingNumber =employees.buildingNumber;
         this.flatNumber =employees.flatNumber;
          this.milkQuantity =employees.milkQuantity;
           this.phone =employees.phone;
           this.milkrate=employees.milkrate;
           this.address=employees.address;
           this.bills=employees.bills;
       console.log(this.bills);
       }else{
         console.log("else createform")
        // this.employeeForm.reset();
       }
  
  }
  // private getEmployee(id: number) {
    
  // }
  saveEmployee(employee): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
   
     let newEmployee = {
      "address" : employee.value.address,
      "apartmentName" : employee.value.apartmentName,
      "buildingNumber" :employee.value.buildingNumber,
      "flatNumber" :employee.value.flatNumber,
      "milkQuantity" : employee.value.milkQuantity,
      "milkrate" : employee.value.milkrate,
      "name" : employee.value.name,
      "phone" :employee.value.phone,
      "bills":[]
      
    };
    if(this.id!=0){
      console.log("employee.id",this.id );
      newEmployee.bills=this.bills;
      this._employeeService.updateemp(newEmployee,this.id )
    }else{
       console.log(employee.value);
   
    console.log(newEmployee);
  
    this._employeeService.save(newEmployee)
      
    }

   
    
      employee.reset();
     this._router.navigate(['list']);



  }
    ngOnDestroy(){
      // if( this.employees.length==0){
        setTimeout(function(){
          window.location.reload();

        },1000)
      
   // }
    }


}
