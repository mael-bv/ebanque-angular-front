import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  authentiqueUser : AppUser | undefined
  users : AppUser[]=[]
  constructor() {
    this.users.push({userid : "azertyuiop",username : "user1",password : "1234", roles : ["USER"]});
    this.users.push({userid : "qsdfghjklm",username : "user2",password : "1234", roles : ["USER"]});
    this.users.push({userid : "wxcvbn",username : "user3",password : "1234", roles : ["USER","ADMIN"]});

   }
   public login(username :string,password : string):Observable<AppUser>{
    let appUser = this.users.find(u=>u.username==username);
    if(!appUser) return throwError(()=>new Error("User not found"));
    if(appUser.password!=password){
       return throwError(()=>new Error("Bad password")); 

    }
    return of(appUser)
   }

   public authenticateUser(appUser : AppUser):Observable<boolean>{
    this.authentiqueUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({username : appUser.username, roles : appUser.roles,jwt : "JWT_TOKEN"}));
    return of(true);
   }

   public hasRole(role :string):boolean{
   return  this.authentiqueUser!.roles.includes(role);

   }

   public isAuthticated(){
    return this.authentiqueUser!=undefined
   }
   public logout(): Observable<boolean>{
    this.authentiqueUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
   }

}
