import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private cryptoKey = "789123";

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

  public saveEncryptedData(key: string, data: string) {
    this.saveData(key, CryptoJS.AES.encrypt(data, this.cryptoKey).toString());
  }

  public getDecryptedData(key: string) : string {
    let encData = <string> this.getData(key);
    return CryptoJS.AES.decrypt(encData, this.cryptoKey).toString(CryptoJS.enc.Utf8);
  }
}
