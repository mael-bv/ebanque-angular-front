import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthentificationGuard } from './guard/authentification.guard';

const routes: Routes = [
  {path : "login",component : LoginComponent},
  {path:"", component:LoginComponent},
  {path :"admin", component : AdminTemplateComponent, canActivate : [AuthentificationGuard],
  children : [
    { path:"customers", component : CustomersComponent},
    { path: "accounts", component : AccountsComponent},
    { path: "new-customer", component : NewCustomerComponent},
    {path: "customer-account/:id", component : CustomerAccountComponent},
  ]},

  {path:"search", component: SearchComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
