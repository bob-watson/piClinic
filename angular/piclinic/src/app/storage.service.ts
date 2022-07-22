import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) : string {
    return <string> localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveEncryptedData(data: string) : string {

  }
}
