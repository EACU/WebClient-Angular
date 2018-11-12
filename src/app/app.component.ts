import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (!!localStorage.getItem('accessToken')) {
      this.userService.getApiUserInformation().subscribe(user => this.userService.setCurrentUser(user));
    }
  }
}
