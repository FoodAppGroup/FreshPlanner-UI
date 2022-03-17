import {environment} from "../../environments/environment";

export class Log {

  public static info(message: string, object?: any) {
    if (!environment.production) {
      console.log('[INFO] ' + message);
      if (object) {
        console.info(object);
      }
    }
  }

  public static error(message: string, object?: any) {
    if (!environment.production) {
      console.error('[ERROR] ' + message);
      if (object) {
        console.error(object);
      }
    }
  }
}
