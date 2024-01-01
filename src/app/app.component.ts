import { Component, OnInit } from '@angular/core';
import { firesbaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GymApp';

  constructor(private firebaseservice: firesbaseService){};

  ngOnInit(): void {
    const app = this.firebaseservice.app;
    const analytics = this.firebaseservice.analytics;
  }

}
