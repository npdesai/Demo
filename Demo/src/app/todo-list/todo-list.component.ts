import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})



export class TodoListComponent implements OnInit {
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  userList: any = [];
  message: number = 0;

  constructor() { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ])
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.myform.value.isCheck = false;
      this.userList.push(this.myform.value);
      this.myform.reset();
      this.message = 1;
    }
  }


  checkAll(ev) {
    this.userList.forEach(x => x.isCheck = ev.target.checked);
  }

  isAllChecked() {
    return this.userList.every(_ => _.isCheck);
  }


  deleteRecord() {

    let flag = false;
    if (this.userList.length > 0) {
      this.userList.forEach(item => {
        if (item.isCheck) {
          flag = true;
        }
      });
      if (flag) {
        var i;
        for (i = this.userList.length - 1; i >= 0; i -= 1) {
          if (this.userList[i].isCheck) {
            this.userList.splice(i, 1);
          }
        }
      } else {
        this.message = 2;
        console.log("Please Select atleast one record.");
      }
    } else {
      this.message = 3;
      console.log("Please add atleast one record.");
    }

  }

}
