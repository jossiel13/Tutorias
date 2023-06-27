import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { $Client } from 'src/app/services/client';
import { query, orderBy, limit } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {



  constructor(private firestore:Firestore) { }


  _getFire():Observable<any>{

    const usersCollection: CollectionReference<$Client> = collection(
      this.firestore,
      'customers') as CollectionReference<$Client>;

    return collectionData<any>(
      query(usersCollection, orderBy('dateCreate', 'desc')),{idField:'id'});

  }

  _getSFire(id:any):Observable<any>{

    const getRef = doc(this.firestore,'customers',id);

    return docData(getRef);

  }

  _addFire(dataClient: any): Promise<any> {

    return addDoc(collection(this.firestore, 'customers'), dataClient);

  }

  _upFire(id:any, dataClient: any): Promise<any> {

    const docInstance = doc(this.firestore, 'customers', id);

    const updateData = dataClient;

    return updateDoc(docInstance, updateData);

  }

  _deleteFire(id: any) {

    return deleteDoc(doc(this.firestore, 'customers', id));

  }

}
