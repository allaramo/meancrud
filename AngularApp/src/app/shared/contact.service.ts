import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { toPromise } from 'rxjs/operators';

import { Contact } from './contact.model';

@Injectable()
export class ContactService {
  selectedContact: Contact;
  contacts: Contact[];
  readonly baseURL = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) { }

  postContact(contact: Contact){
    return this.http.post(this.baseURL, contact);
  }

  getContactList(){
    return this.http.get(this.baseURL);
  }

  putContact(contact: Contact){
    return this.http.put(this.baseURL + '/$(contact._id)',contact);
  }

  deleteContact(_id: string){
    return this.http.delete(this.baseURL + '/$(_id)');
  }
}
