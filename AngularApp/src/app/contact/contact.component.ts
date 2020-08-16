import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from '../shared/contact.service';

declare var M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit(){
    this.resetForm();  
    this.refreshContactList();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset()
    this.contactService.selectedContact = {
      _id: "",
      name: "",
      phone1: "",
      phone2: "",
      phone3: "",
      address: ""
    }
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.contactService.postContact(form.value).subscribe((res)=> {
        this.resetForm(form);
        this.refreshContactList();
        M.toast({html: 'Saved succesfully', classes: 'rounded'});
      });
    } 
    else{
      this.contactService.putContact(form.value).subscribe((res)=> {
        this.resetForm(form);
        this.refreshContactList();
        M.toast({html: 'Updated succesfully', classes: 'rounded'});
      });
    }
    
  }

  refreshContactList(){
    this.contactService.getContactList().subscribe((res)=>{
      this.contactService.contacts = res as Contact[];
    });
  }

  onEdit(contact:Contact){
    this.contactService.selectedContact = contact;
  }

  onDelete(_id:string, form:NgForm){
    if(confirm('Are you sure to delete this record?')==true){
      this.contactService.deleteContact(_id).subscribe((res)=> {
        this.refreshContactList();
        this.resetForm(form);
        M.toast({html:'Deleted successfully', classes: 'rounded'});
      })
    }
  }

}
