import {HttpErrorResponse} from "@angular/common/http";

/**
 * @param error as the default http error or custom error with 'exception' and 'message'
 * @return string - [exception: ] message status-text
 */
export function ParseErrorResponse(error: HttpErrorResponse): string {
  let errorMessage: string = '';
  // exception prefix
  if (error.error.exception) {
    errorMessage += error.error.exception + ': '
  }
  // message
  if (error.error.message) {
    errorMessage += error.error.message;
  } else {
    errorMessage += 'No message found.'
  }
  // status part
  if (error.status === 0) {
    errorMessage += ' [API not available!]'
  } else {
    errorMessage += ' [' + error.statusText + ']';
  }
  return errorMessage;
}
