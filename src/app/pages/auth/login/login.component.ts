import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {

  }

  handleSubmit() {
    console.warn(this.loginForm.value);

  }

}
