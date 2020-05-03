import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm: FormGroup;
  userDet: any = {};
  uploadInput: EventEmitter<UploadInput>;
  files: UploadFile[] = [];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.mode == 'ADD') {
      this.userDet = {}
    } else {
      this.userDet = data.userDet;
      // console.log(this.userDet);
    }
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.uploadInput = new EventEmitter<UploadInput>();
  };

  get f() { return this.contactForm.controls; }

  submit(formData: any) {
    if (this.data.mode == 'ADD') {
      let availableData = [];
      availableData = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [];
      availableData.push(formData);
      localStorage.setItem('data', JSON.stringify(availableData));
      this.dialogRef.close();
    } else {
      let availableData = [];
      availableData = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : [];
      // console.log(availableData)
      let newList = availableData.filter(
        us => ((us.number != formData.number))
      );
      // console.log(newList);
      newList.push(formData);
      // console.log(newList);
      localStorage.setItem('data', JSON.stringify(newList));
      this.dialogRef.close();
    }

  }
  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    switch (output.type) {
      case 'addedToQueue':
        this.files.push(output.file);
        break;
      case 'removedAll':
        this.files = [];
        break;
      default:
    }
    // console.log(this.files);
  }

}
