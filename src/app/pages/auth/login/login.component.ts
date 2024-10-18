import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  hide = signal(true);
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  handleSubmit() {
    console.warn(this.loginForm.value);
    localStorage.setItem('isLogin', 'true')
    this.router.navigate(['/dashoard'])

  }

}
