import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menus = [
    {
      route: '/dashoard',
      name: 'Dashboard'
    },
    {
      route: '/discover',
      name: 'Discover'
    },
    // {
    //   route: '/likes',
    //   name: 'Likes'
    // },
    {
      route: '/subscriptions',
      name: 'Subscriptions'
    },
    {
      route: '/messages',
      name: 'Messages'
    }
  ]
  userName: string = '';
  userEmail: string = '';
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  isLogin: boolean = false;

  constructor(private _authService: AuthService, private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.userName = this.user?.firstName + ' ' + this.user?.lastName;
    this.userEmail = this.user?.email;
    let isLogged: any = localStorage.getItem('isLogin')
    this.isLogin = JSON.parse(isLogged)

    this._profileService.$profile.subscribe((res: any) => {
      if (res) {
        this.user.profilePhoto = res;
      }
    })
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
        this._authService.logout();
      }
    });
  }
}
