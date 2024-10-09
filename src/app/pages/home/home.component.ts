import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedValue = ''
  age = [20,21,22,23,24,25,26,27,28,29,30]

  ngOnInit(): void {
    
  }
}
