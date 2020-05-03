import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selUser: any;
  currUser: any;
  message: any;
  messagePayload: any = {};
  chat: any;

  constructor(public dialogRef: MatDialogRef<ChatComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selUser = data.selUser;
    this.currUser = data.currUser;
    this.chat = data.chat;
  }

  ngOnInit() {
  }

  send() {
    this.messagePayload = {
      'from': this.currUser.fname + ' ' + this.currUser.lname,
      'to': this.selUser.fname + ' ' + this.selUser.lname,
      'message': this.message,
      'time': new Date().getTime()
    }
    let arr = []
    arr = JSON.parse(localStorage.getItem('messages')) ? JSON.parse(localStorage.getItem('messages')) : [];
    arr.push(this.messagePayload)
    localStorage.setItem('messages', JSON.stringify(arr));
    // console.log(arr);
    this.chat.push(this.messagePayload);
    this.messagePayload.type = 'sent';
    this.message = '';
    // this.dialogRef.close();
  }

}
