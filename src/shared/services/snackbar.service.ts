import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    showError(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['error-snackbar'],
        });
    }

    showSuccess(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['success-snackbar'],
        });
    }

    showInfo(message: string) {
        this.snackBar.open(message, null, {
            panelClass: ['info-snackbar'],
        });
    }
}
