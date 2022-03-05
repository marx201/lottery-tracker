import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {Observable, Subject} from "rxjs";

import {Entry} from "../model/entry.model";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  entries: Entry[] = [];
  entriesChange: Subject<Entry[]> = new Subject<Entry[]>();

  constructor(private firestore: Firestore) {
  }

  public saveEntries(entries: Entry[]) {
    this.entries = entries;
    this.entriesChange.next(entries);
  }


  addEntry(entry: Entry) {
    const entryRef = collection(this.firestore, 'entries');
    return addDoc(entryRef, entry);
  }

  addCollection(entries: Entry[]) {
    const entriesRef = collection(this.firestore, 'entries');
    return addDoc(entriesRef, entries);
  }

  getEntries(): Observable<Entry[]> {
    const foodRef = collection(this.firestore, 'entries');
    return collectionData(foodRef, {idField: 'id'}) as Observable<Entry[]>;
  }

  deleteEntry(entry: Entry) {
    const foodDocRef = doc(this.firestore, `entries/${entry.id}`);
    return deleteDoc(foodDocRef);
  }

  getEntryById(id: string) {
    const entryRef = doc(this.firestore, `entries/${id}`);
    return docData(entryRef, {idField: 'id'}) as Observable<Entry>;
  }

  updateEntry(entry: Entry) {
    const entryRef = doc(this.firestore, `entries/${entry.id}`);
    return setDoc(entryRef, entry);
  }

  updateCost(entry: Entry, cost: number) {
    const entryRef = doc(this.firestore, `entry/${entry.id}`);
    return updateDoc(entryRef, {cost: cost});
  }

  updateEarning(entry: Entry, earning: number) {
    const entryRef = doc(this.firestore, `entry/${entry.id}`);
    return updateDoc(entryRef, {earning: earning});
  }

}
