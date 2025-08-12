import { Component, OnInit } from '@angular/core';

import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  title = '';

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.getProperty('title').subscribe(value => {
      console.log('value = ', value);
      this.title = value;
    });
  }
}
