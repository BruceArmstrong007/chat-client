import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('Error Saving to Local Storage' + e);
    }
  }
  get(key: string) {
    try {
      let val = localStorage.getItem(key);
      if (val != null) val = JSON.parse(val);
      return val;
    } catch (e) {
      console.log('Error Getting Data from Local Storage' + e);
      return null;
    }
  }
  delete(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log('Error Deleting Data from Local Storage' + e);
    }
  }
}
