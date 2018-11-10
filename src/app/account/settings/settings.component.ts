import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/shared/models/user.information.interface';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => this.currentUser = user);
  }

}
