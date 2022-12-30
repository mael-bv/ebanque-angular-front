import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccoutDetail } from '../model/account.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize : number = 5;
  accountObservable! : Observable<AccoutDetail>
  operationFormGroup! : FormGroup
  customers : any


  constructor(private fb : FormBuilder,private accountService : AccountsService) { }

  ngOnInit(): void {
   this.accountService.getCustomerForAccount().subscribe({
    next : (data)=>{
      this.customers= data
    },
    error : (err)=>{
      console.log(err);
      
    }
   })
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    })
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(""),
      amount  : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })
  }

  handleSearchAccount(){
    let accountId = this.accountFormGroup.value.accountId;
   this.accountObservable = this.accountService.getAccount(accountId,this.currentPage,this.pageSize);

  }
  goToPage(page : number){
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation(){
    
    let accountId:string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    if(operationType=='DEBIT'){
      this.accountService.debit(accountId,this.operationFormGroup.value.amount,this.operationFormGroup.value.description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.handleSearchAccount();
        },
        error : (err)=>{
          console.log("Problem debit");
          
        }
      });
    }else if(operationType=='CREDIT'){
      this.accountService.credit(accountId,this.operationFormGroup.value.amount,this.operationFormGroup.value.description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.handleSearchAccount();
        },
        error : (err)=>{
          console.log("Problem Credit");
          
        }
      });
    }else if(operationType=='TRANS'){
      this.accountService.transfer(accountId,this.operationFormGroup.value.accountDestination,this.operationFormGroup.value.amount).subscribe({
        next : (data)=>{
          alert("Success Transfer");
          this.handleSearchAccount();
        },
        error : (err)=>{
          console.log("Problem transfer");
          
        }
      });
    }
    this.operationFormGroup.reset();
  }
}
