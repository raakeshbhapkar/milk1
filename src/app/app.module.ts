import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { envoirment } from './envoirment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule,AngularFirestore  } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { EmplistComponent } from './component/emplist/emplist.component';
import { CreateempComponent } from './component/createemp/createemp.component';

import { EmployeeService } from './share/emp.ser';

import { EmpDetailsComponent } from './component/emp-details/emp-details.component';

import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

import {MatDatepickerModule,MatNativeDateModule} from '@angular/material';


const appRoutes: Routes = [
  {
    path: 'list',
    component: EmplistComponent

  },

  { path: 'viewBill', component: EmpDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: "full" },
  {
    path: 'edit/:id',
    component: CreateempComponent
  },
  { path: '**', component: PageNotFoundComponent},
]
@NgModule({
  declarations: [
    AppComponent,

    EmplistComponent,
    CreateempComponent,
    EmpDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
   AngularFireDatabaseModule,
   MatDatepickerModule,
   AngularFireModule.initializeApp(envoirment.firebase,'angulafs'),
   AngularFirestoreModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { 
constructor( private afs: AngularFirestore ){
  const settings = { timestampsInSnapshots: true };
      afs.app.firestore().settings( settings );
}


}
