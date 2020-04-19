import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthenticationService) {
    
   }

  sevas :ISeva[] = [
    {
    id: 1,
    seva : 'Abhisheka',
    too : 'Sri Krishna',
    behalfOf: 'Ramkrishna M',
    occation : 'Marriage day',
    date: new Date(),
    names: [1,2]
  },
  {
    id: 2,
    seva : 'Abhisheka',
    too : 'Sri Lakshmi',
    behalfOf: 'Maaruthi',
    occation : 'Birthday',
    date: new Date(),
    names: [4,8]
  },
];

programs : IPrograms[] = [
  {
    id :1,
    program : 'Marriage',
    on : new Date(),
    contactNum : 9742942333
  },
  {
    id: 2,
    program: 'Naming Ceremony',
    contactNum: 9880066835,
    on: new Date()
  }
]

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}

export interface ISeva {
  id: number,
  seva: string,
  too : string,
  behalfOf: string,
  date: Date,
  names: number[],
  occation : string
}

export interface IPrograms {
  id: number,
  program: string,
  on: Date,
  contactNum : number,
}
