import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Opens SnackBar with primary style.
 *
 * @param snackBar injected MatSnackBar from component
 * @param message custom message
 */
export function OpenSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'OK', {
    duration: 5000,
    panelClass: ['primary-snack-bar']
  });
}

/**
 * Opens SnackBar with warn style.
 *
 * @param snackBar injected MatSnackBar from component
 * @param message custom message
 */
export function OpenWarnSnackBar(snackBar: MatSnackBar, message: string): void {
  snackBar.open(message, 'OK', {
    duration: 8000,
    panelClass: ['warn-snack-bar']
  });
}
