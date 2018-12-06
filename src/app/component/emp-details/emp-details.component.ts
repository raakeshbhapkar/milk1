import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../share/emp.ser';


@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  private selectempId: any;
  private employe: any;
  private _id;
  private bills:any=[];
  private totalMilk:number=0;
  private totalAmount:number=0;
  private monthArray=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private monthset=[];
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) { }
 
  ngOnInit() {
    //this.selectempId = this._route.snapshot.paramMap.get("id");
    let d = new Date();
    let  n = d.getMonth();
    let check=+n-3;
    console.log("n",n);
    console.log("check",check);
    this.monthset=[];
    for(var i=n;i>check;i--){
      console.log("n loop", i)
      console.log(this.monthArray[i])
      let data={"value":i,"month":this.monthArray[i]}
      this.monthset.push(data)
    }


   this.employe =this._employeeService.sendBill();
   if(this.employe==undefined){
      this._router.navigate(['list']);
   }
   this.setSelectedchange(this.monthset[0].value)
 
  
  }
   ngOnDestroy(){
      // if( this.employees.length==0){
      window.location.reload();
   // }
    }
  
    setSelectedchange(selectValue){
      this.bills=[];
      this.totalMilk=0;
      this.totalAmount=0;
      console.log("bill component",this.employe);
   this.employe.bills.forEach(element => {
     console.log("element",element);
    let getDate=new Date(element.datesetofBills);
    let getMonth=getDate.getMonth();
    console.log(this.monthset[0].value,"getMonth",getMonth);
    
     if(element.CheckedofBills==true && getMonth==selectValue){
      this.bills.push(element);
      this.totalMilk +=+element.milkQuantityofBills;
       this.totalAmount=this.totalMilk*+this.employe.milkrate;

     }
    
     console.log(" this.bills", this.bills)
     console.log("this.totalMilk",this.totalMilk);
     console.log("this.totalAmount",this.totalAmount);
   });
  }


}
