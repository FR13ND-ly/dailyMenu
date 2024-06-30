import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsSubject = new BehaviorSubject<any>([]);

  constructor() { 
    this.itemsSubject.next(JSON.parse(<any>(localStorage.getItem('items'))) || []);
  }

  getItems() {
    return this.itemsSubject.asObservable();
  }

  addItem(item: any) {
    console.log(item)
    this.itemsSubject.next([...this.itemsSubject.value, item]);
    localStorage.setItem('items', JSON.stringify(this.itemsSubject.value));
  }

  updateItem(item: any) {
    console.log(item)
    this.itemsSubject.next(this.itemsSubject.value.map((i: any) => i.id === item.id ? item : i));
    localStorage.setItem('items', JSON.stringify(this.itemsSubject.value));
  }

  removeItem(item: any) {
    this.itemsSubject.next(this.itemsSubject.value.filter((i: any) => i !== item));
    localStorage.setItem('items', JSON.stringify(this.itemsSubject.value));
  }


}
