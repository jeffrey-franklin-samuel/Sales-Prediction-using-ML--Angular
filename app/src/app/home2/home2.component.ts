import { Component,OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit{

  constructor(public afAuth:AngularFireAuth) { }
  ngOnInit(): void {

  }
  logout(): void {
    this.afAuth.signOut();
}



}
