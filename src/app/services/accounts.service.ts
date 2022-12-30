import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccoutDetail } from '../model/account.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public account(){
    return this.http.get(environment.host+"/accounts");
  }
  public getAccountSolo(id :string){
    return this.http.get(environment.host+"/accounts/"+id);
  }

  public getAccount( accountId : string,page : number,size:number):Observable<AccoutDetail>{
    return  this.http.get<AccoutDetail>(environment.host+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId :string,amount : number, description : string){
    let data = {accountId : accountId, amount : amount, description : description}
     return this.http.post(environment.host+"/accounts/debit",data);
  }

  public credit(accountId :string,amount : number, description : string){
    let data = {accountId : accountId, amount : amount, description : description}
     return this.http.post(environment.host+"/accounts/credit",data);
  }

  public transfer(accountSource :string,accountDestination : string, amount : number){
    let data = {accountSource : accountSource, accountDestination : accountDestination, amount : amount}
     return this.http.post(environment.host+"/accounts/transfer",data);
  }

  //POUR ENTREPRISE LOTFY
  public getCustomerForAccount(){
    return this.http.get(environment.host+"/customers");
  }

}
