import { Component, OnInit,ViewChild,ElementRef,ViewChildren,QueryList } from '@angular/core';

import { EmployeeService } from '../../share/emp.ser'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {
  
 @ViewChild('mydatepicker') mydatepicker:ElementRef;
  //@ViewChild('milkselect') milkselect:ElementRef; 
  @ViewChildren('milkselect')
  private milkselect:QueryList<any>; 
  private milkselectArray:Array<any>
  private selectall=false;
  employees = [];
start_time = new Date()
  constructor(private _EmployeeService: EmployeeService, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    
    console.log("list init");
    this._EmployeeService.getEmployeesData().subscribe((empList) => {
      console.log(2222);
      console.log(empList);
      // this.employees=[];
     this.employees=empList;
     console.log(this.employees);
    })
   


  }


  editEmployee(employeeone: any) {
    //let lastindex = employeeId.lastIndexOf("/");
    //let setId = employeeId.slice(lastindex + 1, employeeId.length);
    //console.log("setId", setId);
     this._EmployeeService.getEmployee(employeeone);
    console.log(employeeone.id)
    this._router.navigate(['/edit', employeeone.id])

  }
  deleteEmployee(employeeId,data) {
    // let lastindex = employeeId.lastIndexOf("/");
    // let setId = employeeId.slice(lastindex + 1, employeeId.length);
    console.log(data);
    this._EmployeeService.deleteEmployee(data);
  }
  saveEmp(employees){
       this.employees.forEach((role,index)=>{
         console.log("role.bills",role.bills);
        role.bills.forEach((element,i) => {
            console.log("element",element);
            console.log("element.datesetofBills",element.datesetofBills);
            if(element.datesetofBills==this.mydatepicker.nativeElement.value){
              console.log("its match");
                role.bills.splice(i,1);
            }
      let d = new Date();
      let prewDate=d.setMonth(d.getMonth() - 2);
      let predateFinal = new Date(prewDate);
      let currentDate=new Date(element.datesetofBills);
      console.log("predateFinal",predateFinal)
        console.log("currentDate",currentDate)
        if(predateFinal>currentDate){
            role.bills.splice(i,1);
        }
          });
       });

   // console.log(employees);
    //console.log(this.mydatepicker.nativeElement.value);
     this.employees.forEach((role,index)=>{
      console.log("index",index);
       console.log("rolebefore",role);
      
       console.log("milkToday",role.milkToday);
       let milkget=role.milkToday;
       //role.checked = "checked";
       console.log("role.checked",role.checked);
       if(milkget==""){
        milkget=role.milkQuantity
       }
        //let data={' CheckedofBills': role.checked,'datesetofBills':this.mydatepicker.nativeElement.value, 'milkQuantityofBills':role.milkToday}
        let data={'CheckedofBills':role.checked,'datesetofBills':this.mydatepicker.nativeElement.value, 'milkQuantityofBills':milkget}
      var d = new Date();
      var prewDate=d.setMonth(d.getMonth() - 2);
      // if(prewDate){

      // }
      console.log("rolefter",role);
      role.bills.push(data);
       //console.log("11role",role);
       console.log(role.bills);
      this._EmployeeService.updatebillData(role,role.id)
    });
    this.selectall=false;
  }
   ngAfterViewInit() {
    this.milkselectArray=this.milkselect.toArray();
   }
  viewBillEmployee(data){
    this._EmployeeService.viewBill(data);
    this._router.navigate(['/viewBill'])
 }
selectAllFunc(event){
  this.selectall=event.target.checked;
  console.log("this.selectall",this.selectall);
    this.employees.forEach((role,index)=>{
      role.checked=this.selectall;
    });

}


}

