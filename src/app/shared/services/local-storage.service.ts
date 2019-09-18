import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelper {

  public cacheData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getCachedData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public clearCachedData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAll(): void {
    localStorage.clear();
  }

}
