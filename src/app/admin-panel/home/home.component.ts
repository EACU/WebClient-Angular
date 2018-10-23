import { Component, OnInit } from '@angular/core';
import { AdminDetails } from '../models/admin.details.interface';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminDetails: AdminDetails;

  constructor(private dashboardService: AdminService) { }

  ngOnInit() {
    this.dashboardService.getAdminDetails().subscribe((adminDetails: AdminDetails) => this.adminDetails = adminDetails);
  }

}
