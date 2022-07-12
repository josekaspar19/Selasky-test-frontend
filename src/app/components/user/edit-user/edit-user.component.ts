import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CrudService } from 'src/app/service/crud.service';

import{Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  formUser: FormGroup;
  userID:any;

  constructor(
    public form:FormBuilder,
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    private route:Router
  ) { 
    this.userID=this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.userID);
    
    this.crudService.GetOrder(this.userID).subscribe(resp=>{
      console.log(resp);
      this.formUser.setValue({
        Name:resp[0]['Name'],
        Email:resp[0]['Email'],
        Status:resp[0]['Status']
      });
    }
  );
  this.formUser=this.form.group(
    {
      Name:[''],
      Email:[''],
      Status:['']
    }
  );
  }


  ngOnInit(): void {
  }
  sendData():any{
    console.log(this.userID);
    console.log(this.formUser.value);
    this.crudService.EditUser(this.formUser.value, this.userID).subscribe(
      resp => {
        console.log(resp);
        if(resp.message !== 'User Updated!!!'){
          console.log(resp);
        }else{
          Swal.fire({
            icon: 'success',
            title: 'You have successfully updated the user!',
            showConfirmButton: false,
            timer: 1500
          });
          this.route.navigateByUrl('/list-user');
        }

        // this.Email = "";
        // this.Status = 0;
        // console.log(resp);
      }
    );
  }

}
