/**
 * Generic Class to store Objects into the browser Session Storage.
 */
export class SessionStore<Type> {

  public isPresent(objKey: string): boolean {
    return !!sessionStorage.getItem(objKey);
  }

  public setObj(objKey: string, obj: Type): void {
    sessionStorage.setItem(objKey, JSON.stringify(obj));
  }

  public getObj(objKey: string): Type | undefined {
    if (this.isPresent(objKey)) {
      return JSON.parse(sessionStorage.getItem(objKey) as string);
    } else {
      return undefined;
    }
  }

  public removeObj(objKey: string): void {
    if (this.isPresent(objKey)) {
      sessionStorage.removeItem(objKey);
    }
  }
}
