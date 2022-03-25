import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {StorageItemModel, StorageModel} from "../models/storage/storage.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageSummaryModel} from "../models/storage/storage-summary.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private controllerUrl = environment.backendApiUrl + '/storage';
  private defaultHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  // === POST ========================================================================================================

  public addStorage(storageModel: StorageSummaryModel): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/insert';
    return this.httpClient.post <StorageModel>(endpointUrl, storageModel, this.defaultHeaders);
  }

  public addStorageItem(storageId: number, storageItemModel: StorageItemModel): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/insert-item/' + storageId;
    return this.httpClient.post <StorageModel>(endpointUrl, storageItemModel, this.defaultHeaders);
  }

  // === GET =========================================================================================================

  public getUserStorages(): Observable<StorageSummaryModel[]> {
    return this.httpClient.get<StorageSummaryModel[]>(this.controllerUrl, this.defaultHeaders);
  }

  public getStorageById(storageId: number): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/get/' + storageId;
    return this.httpClient.get<StorageModel>(endpointUrl, this.defaultHeaders);
  }

  // === PUT =========================================================================================================

  public addUser(storageId: number, username: string): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/add-user/' + storageId + '?username=' + username;
    return this.httpClient.put<StorageModel>(endpointUrl, this.defaultHeaders);
  }

  public removeUser(storageId: number, username: string): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/remove-user/' + storageId + '?username=' + username;
    return this.httpClient.put<StorageModel>(endpointUrl, this.defaultHeaders);
  }

  // === DELETE ======================================================================================================

  public deleteStorageItem(storageId: number, productId: number): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/delete-item/' + storageId + '/' + productId;
    return this.httpClient.delete<StorageModel>(endpointUrl, this.defaultHeaders);
  }

  public deleteStorage(storageId: number): Observable<StorageModel> {
    const endpointUrl = this.controllerUrl + '/delete/' + storageId;
    return this.httpClient.delete<StorageModel>(endpointUrl, this.defaultHeaders);
  }
}
