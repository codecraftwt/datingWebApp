import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = signal(true);
  loginForm = new FormGroup({
    email: new FormControl('trupti01@yopmail.com'),
    password: new FormControl('Trupti@123'),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  handleSubmit() {
    console.warn(this.loginForm.value);
    localStorage.setItem('isLogin', 'true')
    this.authService.login(this.loginForm.value)
      .subscribe(response => {
        console.log(response, 'response')
        if (response.status == 200) {
          this.router.navigate(['/dashoard'])
        }
      })


  }

}
