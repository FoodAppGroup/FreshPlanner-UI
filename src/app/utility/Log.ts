import {environment} from "../../environments/environment";

export class Log {

  /**
   * To log exceptions from try/catch.
   *
   * @param exception as error
   */
  public static exception(exception: any) {
    console.error(exception);
  }

  /**
   * Custom log for information within the dev environment.
   *
   * @param message to print as info
   * @param object optional object to print in a new line
   */
  public static info(message: string, object?: any) {
    if (!environment.production) {
      console.log('[INFO] ' + message);
      if (object) {
        console.info(object);
      }
    }
  }

  /**
   * Custom log for an error within the dev environment.
   *
   * @param message to print as error
   * @param object optional object to print in a new line
   */
  public static error(message: string, object?: any) {
    if (!environment.production) {
      console.error('[ERROR] ' + message);
      if (object) {
        console.error(object);
      }
    }
  }
}
