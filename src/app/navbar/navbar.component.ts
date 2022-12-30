import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth : AuthentificationService, private router :Router) { }

  ngOnInit(): void {
  }

  handleLogout(){
    this.auth.logout().subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/");
      }
    })
  }

}
