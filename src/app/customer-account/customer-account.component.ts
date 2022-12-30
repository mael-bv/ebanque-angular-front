import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css']
})
export class CustomerAccountComponent implements OnInit {
  customerId! : string ;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }

}
