import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';


@Injectable()
export class EmployeeService {
    
    itemcollection:AngularFirestoreCollection<any>;
    items:Observable<any[]>;
    itemDoc:AngularFirestoreDocument<any>;
    editData;
    viewBillData;
    constructor(private _http: Http, public angularFirestore:AngularFirestore) { 
        this.itemcollection=this.angularFirestore.collection('items');
       // console.log(angularFirestore.collection('items').valueChanges());
       // this.items=angularFirestore.collection('items').valueChanges();
        this.items=angularFirestore.collection('items').snapshotChanges().map(changes =>{
                return changes.map(a=>{
                    const data=a.payload.doc.data();
                    data.id=a.payload.doc.id;
                    data.checked=false;
                    data.datedToday="";
                    data.milkToday="";

                    console.log("data",data);
                    return data;
                })

        });
         console.log(7777);
        console.log(this.itemcollection);
    }
    getEmployeesData(): Observable<any> {
        return this.items
        // return this._http.get('https://milk-836cf.firebaseio.com/members.json')
        //     .pipe(map((response: Response) => response.json()));
    }
    getEmployee(emp) {
       this.editData=null;
       this.editData=emp;
        //  return this._http.get(`https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks/${id}`)
        //     .pipe(map((response: Response) => response.json()));
    }
    setEmployee(){
        return this.editData;
    }
    updateemp(itemm,id){
          console.log(itemm.id);
         this.itemDoc=this.angularFirestore.doc(`items/${id}`);
          this.itemDoc.update(itemm);
    }
    save(employee) {
        this.itemcollection.add(employee);
    


    }
    updatebillData(itemm,id){
         console.log(id);
       this.itemDoc=this.angularFirestore.doc(`items/${id}`);
      //this.itemDoc.push({description: "new Item"});
        //this.itemcollection.doc(id).set({ bills: [{ who: "third@test.com", when: new Date() }] })
        this.itemDoc.update(itemm);

    }
    deleteEmployee(itemm) {
      
        this.itemDoc=this.angularFirestore.doc(`items/${itemm.id}`);
          this.itemDoc.delete();

    }
    
    viewBill(data){
        this.viewBillData=data
    }
    sendBill(){
        return this.viewBillData;
    }    
}
interface item{
    id:"any",
    name:"any",
    phone:"any",
    milkQuantity:"any",
    milkrate:"any",
    address:"any",
    apartmentName:"any",
    buildingNumber:"any",
    flatNumber:"any",
    
}