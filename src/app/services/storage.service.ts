import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {StorageModel} from "../models/storage/storage.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    // TODO implement httpClient
  }

  private static mockStorageSelection(): Map<number, string> {
    return new Map<number, string>([
      [1, 'Home'],
      [2, 'Work']
    ]);
  }

  private static mockStorage(): StorageModel {
    return {
      id: 1,
      name: 'Home',
      users: [
        'Florian',
        'Felix'
      ],
      items: [
        {
          productId: 1,
          productName: 'Item 1',
          count: 1,
          unit: 'GRAM',
        },
        {
          productId: 2,
          productName: 'Item 2',
          count: 2,
          unit: 'GRAM',
        }
      ]
    }
  }

  public getStorage(storageId: number): Observable<StorageModel> {
    return of(StorageService.mockStorage());
  }

  public getStorageSelection(): Observable<Map<number, string>> {
    return of(StorageService.mockStorageSelection());
  }
}
