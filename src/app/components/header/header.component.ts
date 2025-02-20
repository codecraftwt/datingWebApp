import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
  isLogin: boolean = false;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    let isLogged: any = localStorage.getItem('isLogin')
    this.isLogin = JSON.parse(isLogged)
  }

  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
