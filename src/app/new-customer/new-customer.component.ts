import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
newCustumerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,private customerService :CustomerService,private router : Router) { }

  ngOnInit(): void {
    this.newCustumerFormGroup = this.fb.group({
      name: this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      mail : this.fb.control(null,[Validators.required,Validators.email])
    })
  }

  saveCustomer(){
    let customer:Customer = this.newCustumerFormGroup.value;
     this.customerService.saveCustomer(customer).subscribe({
      next : data=>{
        alert("Customer saved succes");
       // this.newCustumerFormGroup.reset();
       this.router.navigateByUrl("/customers")
      },
      error : err=>{
        console.log(err);
        
      }
     })

  }

}
