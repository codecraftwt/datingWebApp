import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {
  private _activatedRouter = inject(ActivatedRoute);
  private _router = inject(Router);
  _socketService = inject(SocketService)
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  selectedUserId = ''

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params: any) => {
      console.log(params, '<==== params');
      this.selectedUserId = params.id
    })
  }

  createRoom(): void {
    const payload = {
      createdBy: this.user._id,
      createdWith: this.selectedUserId
    }

    this._socketService.createRoom(payload).subscribe({
      next: (response) => {
        console.log(response, 'create room response');
        if (response.success) {
          this._router.navigate(['/messages']);
        }
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  handleMessage() {
    console.log('handle message')
    this.createRoom();
  }

}
