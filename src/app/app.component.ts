import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.staging';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'DatingWebApp';
  ngOnInit(): void {
    console.log('Running environment:', environment.apiUrl);
  }
}
