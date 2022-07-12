import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  Users:any;
  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers():any {
    this.crudService.GetAllUser().subscribe(
      resp => {
        console.log(resp);
        this.Users=resp;
      });
  }
  deleteUser(id:any,IControl:any){

    Swal.fire({
      title: 'Are you sure you want to delete the User?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete the user!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.DeleteUser(id).subscribe(
          (resp) =>{
            if(resp.message==="The user you want to delete has an assigned order and cannot be deleted."){
              Swal.fire(
                'Error!',
                'The user you want to delete has an assigned order and cannot be deleted.',
                'error'
              )
            }else{
              this.Users.splice(IControl,1);
              Swal.fire(
                'Deleted!',
                'The user has been deleted.',
                'success'
              )
            }

            console.log(resp);
          });
      }
    })
  }
}
