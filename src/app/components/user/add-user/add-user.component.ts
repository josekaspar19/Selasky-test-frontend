import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formUser: FormGroup;

  constructor(
    public form:FormBuilder,
    private crudService:CrudService,
    private route:Router
    ) { 

    this.formUser=this.form.group({
      Name:[''],
      Email:[''],
      Status:['']
    });
  }

  ngOnInit(): void {
  }
  //Función utilizada para recepcionar la data de los inputs del formulario ADDUSER.
  sendData():any {
    console.log(this.formUser.value);
    // this.crudService.AddUser(this.formUser.value).subscribe();
    this.crudService.AddUser(this.formUser.value).subscribe(
      resp => {
        console.log(resp);
        if(resp.message !== 'User added!!!'){
          console.log(resp);
        }else{
          Swal.fire({
            icon: 'success',
            title: 'You have successfully added the user!',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigateByUrl('/list-user');
        }

        // this.Email = "";
        // this.Status = 0;
        // console.log(resp);
      }
    );
  }

}
