import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';

import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { EditOrderComponent } from './components/order/edit-order/edit-order.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';

const routes: Routes = [

  //ROUTES USERS
  {path: '', pathMatch:'full', redirectTo:'list-user'},
  {path: 'add-user', component:AddUserComponent},
  {path: 'list-user', component:ListUserComponent},
  {path: 'edit-user/:id', component:EditUserComponent},

   //ROUTES ORDERS
   {path: 'add-order', component:AddOrderComponent},
   {path: 'list-order', component:ListOrderComponent},
   {path: 'edit-order/:id', component:EditOrderComponent},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
