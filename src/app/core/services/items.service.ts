import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { BehaviorSubject, Observable, from, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsService {

  itemsSubject = new BehaviorSubject<any[]>([]);
  itemsCollection: string = 'items'; 
  firestore: any = inject(Firestore);
  items = collection(this.firestore, this.itemsCollection)

  constructor() {
    this.getItemsFromFirestore();
  }

  getItems(): Observable<any[]> {
    return this.itemsSubject.asObservable();
  }

  getItemsFromFirestore() {
    from(getDocs(this.items)).subscribe((snapshot) => {
      let items = snapshot.docs.map((doc:any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      this.itemsSubject.next(items)
    })
  }

  addItem(item: any) {
    return from(addDoc(this.items, item)).pipe(tap(() => this.getItemsFromFirestore()));
  }

  updateItem(item: any) {
    let d = doc(this.firestore, this.itemsCollection, item.id);
    return from(updateDoc(d, item)).pipe(tap(() => this.getItemsFromFirestore()));
  }

  removeItem(item: any) {
    let d = doc(this.firestore, this.itemsCollection, item.id);
    return from(deleteDoc(d)).pipe(tap(() => this.getItemsFromFirestore()));
  }
}
