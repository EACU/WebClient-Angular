import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/shared/services/sidenav.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {

  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }
}
