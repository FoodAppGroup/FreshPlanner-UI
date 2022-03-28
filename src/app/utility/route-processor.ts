import {ActivatedRoute} from "@angular/router";

/**
 * Extracts the parameter 'id' from the ActivatedRoute.
 *
 * Returns ID as Number or RouteError.
 *
 * @param route as ActivatedRoute with parameter 'id'
 */
export function GetIdFromRoute(route: ActivatedRoute): number {
  let routeId: string | null | number = route.snapshot.paramMap.get('id');
  if (routeId != null) {
    routeId = parseInt(routeId);
    if (routeId) {
      return routeId;
    } else {
      throw new RouteError(routeId);
    }
  } else {
    throw new RouteError(routeId);
  }
}

export class RouteError extends Error {
  constructor(routeParameter: string | null | number) {
    super('Unable to process Route Parameter: ' + routeParameter);
  }
}
