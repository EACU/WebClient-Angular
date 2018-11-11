import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/shared/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackbarService: SnackBarService) { }

  ngOnInit() {

  }

  testErrorToaster() {
    this.snackbarService.showError('Какая-то операция: ошибка выполнения!');
  }

  testSuccessToaster() {
    this.snackbarService.showSuccess('Какая-то операция: успешно завершена!');
  }

  testInfoToaster() {
    this.snackbarService.showInfo('Какая-то операция: информация об операции');
  }
}
