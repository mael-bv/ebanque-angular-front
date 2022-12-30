import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) {}

  
   public getCustomers():Observable<Array<Customer>>{
      return this.http.get<Array<Customer>>(environment.host+"/customers");

     }

     public searchCustomer(keyword : string):Observable<Array<Customer>>{
      return this.http.get<Array<Customer>>(environment.host+"/customers/search?keyword="+keyword);
     }

     public saveCustomer(customer:Customer):Observable<Customer>{
      return this.http.post<Customer>(environment.host+"/customers",customer);
     }

     public deleteCustomer(id : number){
      return this.http.delete(environment.host+"/customers/"+id);
     }

}
