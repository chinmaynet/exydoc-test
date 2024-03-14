import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  getGroupDataByName(groupName: string): any {
    const groups = this.getData('groups') || [];
    return groups.find((group: any) => group.groupName === groupName);
  }
}
