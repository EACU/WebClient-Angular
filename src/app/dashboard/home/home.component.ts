import { Component, OnInit } from '@angular/core';
import { StudentDetails } from '../models/student.details.interface';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentDetails: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getHomeDetails().subscribe((studentDetails: any) => this.studentDetails = studentDetails);
  }

}
