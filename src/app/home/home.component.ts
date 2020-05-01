import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  defaultUser: any = {
    fname: 'Abdul',
    lname: 'Adnan Baig',
    mail: 'adnanabdul8@gmail.com',
    number: '9840872762'
  };
  currentUser: any = {};
  userList: any;
  userMessagesReceived: any;
  myMessages: any;
  messageListDisplay: string[];
  userChat: any = [];
  userMessagesSent: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.setData();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : this.defaultUser;
    console.log(this.currentUser);
    this.createUserList();
  }

  createUserList() {
    let dataSet = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [];
    this.userList = dataSet.filter(
      user => user.number != this.currentUser.number
    );
    this.checkMessages()
  }
  changeUser(data: any) {
    console.log(data);
    this.currentUser = data;
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.createUserList();
  }

  addContact(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      // minHeight: '60vh',
      data: {
        mode: 'ADD'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  editContact(data: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        userDet: data,
        mode: 'EDIT'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  chat(data): void {
    var fullName = data.fname + ' ' + data.lname;
    this.selectChat(fullName)
    const dialogRef = this.dialog.open(ChatComponent, {
      data: {
        selUser: data,
        currUser: this.currentUser,
        chat: this.userChat
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.checkMessages();
    });
  }
  checkMessages() {
    let tmp = JSON.parse(localStorage.getItem('messages')) ? JSON.parse(localStorage.getItem('messages')) : [];
    this.userMessagesReceived = tmp.filter(
      us => us.to == (this.currentUser.fname + ' ' + this.currentUser.lname)
    );
    this.userMessagesSent = tmp.filter(
      us => us.from == (this.currentUser.fname + ' ' + this.currentUser.lname)
    );
    console.log(this.userMessagesSent);
    var userMessagesGrp = this.userMessagesReceived;
    userMessagesGrp = this.groupBy(userMessagesGrp, 'from');
    this.messageListDisplay = Object.keys(userMessagesGrp);
    console.log(userMessagesGrp);
  }
  selectChat(data: any) {
    this.userChat = [];
    for (let index = 0; index < this.userMessagesReceived.length; index++) {
      const element = this.userMessagesReceived[index];
      if (element.from == data) {
        element.type = 'got';
        this.userChat.push(element);
        console.log(this.userChat)
      }
    }
    for (let index = 0; index < this.userMessagesSent.length; index++) {
      const element = this.userMessagesSent[index];
      if (element.to == data) {
        element.type = 'sent';
        this.userChat.push(element);
        console.log(this.userChat)
      }
    }
    this.userChat.sort(function (x, y) {
      return x.time - y.time;
    });
    console.log(this.userChat);
  }
  groupBy(iarr, ikey) {
    return iarr.reduce((a, b) => {
      (a[b[ikey]] = a[b[ikey]] || []).push(b);
      return a;
    }, {})
  }

  setData() {
    if (JSON.parse(localStorage.getItem('data'))){
      // do nothing
    } else {
      this.data = [
        {
          fname: 'Abdul',
          lname: 'Adnan Baig',
          mail: 'adnanabdul8@gmail.com',
          number: '9840872762'
        },
        {
          fname: 'Alagappan',
          lname: 'palaniappan',
          mail: 'alagumpl@gmail.com',
          number: '9840874937'
        },
        {
          fname: 'Alagappan',
          lname: 'Alagappan',
          mail: 'alagu7@gmail.com',
          number: '9840802938'
        },
        {
          fname: 'Sai',
          lname: 'Alekya',
          mail: 'saialaek@gmail.com',
          number: '9840853648'
        },
        {
          fname: 'Ismuddin',
          lname: 'Abdulsamad',
          mail: 'ismu@gmail.com',
          number: '9840800928'
        },
        {
          fname: 'Hari',
          lname: 'Prakash',
          mail: 'hari@gmail.com',
          number: '9840892883'
        },
      ]
      localStorage.setItem('data', JSON.stringify(this.data));
    }
  }

  }
