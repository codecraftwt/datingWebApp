import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menus = [
    {
      route: '/dashoard',
      name: 'Home'
    },
    {
      route: '/discover',
      name: 'Discover'
    },
    {
      route: '/likes',
      name: 'Likes'
    },
    {
      route: '/messages',
      name: 'Messages'
    }
  ]
  isLogin: boolean = false

  ngOnInit(): void {
    let isLogged: any = localStorage.getItem('isLogin')
    this.isLogin = JSON.parse(isLogged)
  }

}
