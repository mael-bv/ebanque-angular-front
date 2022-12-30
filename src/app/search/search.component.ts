import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';
import { AccoutDetail } from '../model/account.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
accounts! : any
acc :any

  constructor(private account :AccountsService) { }

  ngOnInit(): void {
    this.account.account().subscribe({
      next : (data)=>{
        this.accounts = data
      
      },
      error : (err)=>{
        console.log("nooooope");
        
      }
    })

  }
/*   search(id:any){
  
  this.account.getAccountSolo(id).subscribe({
    next : (data)=>{
      this.acc = data
    },
    error : (err)=>{
      console.log("nununununu");
      
    }
  })  
  } */

  search(id:any){
    this.account.account().subscribe({
      next : (data)=>{
        this.acc = data
      },
    })
  }

}
