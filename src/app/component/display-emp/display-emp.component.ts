import { Component, OnInit ,Input,SimpleChanges,Output,EventEmitter} from '@angular/core';
import {EmployeeService} from '../../share/emp.ser'
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-display-emp',
  templateUrl: './display-emp.component.html',
  styleUrls: ['./display-emp.component.css']
})
export class DisplayEmpComponent implements OnInit {

 private selectempId:number;
employe;
  constructor(private _activatedRoute:ActivatedRoute,private _EmployeeService:EmployeeService) { }

  ngOnInit() {
    console.log("in display3333")
    // this.selectempId=+this._activatedRoute.snapshot.paramMap.get("id");
    // console.log(this.selectempId)
    //    this._EmployeeService.getEmployee(this.selectempId).subscribe((empList) => {
    //   console.log(empList);
    //   this.employe=empList;
    // })
  }



}
