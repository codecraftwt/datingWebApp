import { Component, inject, OnInit } from '@angular/core';
import { DiscoverService } from '../../services/discover.service';

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

  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  isLogin: boolean = false

  ngOnInit(): void {
    let isLogged: any = localStorage.getItem('isLogin')
    this.isLogin = JSON.parse(isLogged)
  }

}
