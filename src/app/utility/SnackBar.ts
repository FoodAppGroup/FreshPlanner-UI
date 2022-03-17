import {MatSnackBar} from "@angular/material/snack-bar";

export function OpenSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'OK', {
    duration: 3000,
    panelClass: ['primary-snack-bar']
  });
}
