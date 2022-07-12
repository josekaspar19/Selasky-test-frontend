import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/service/crud.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  Orders:any;
  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.GetAllOrder();
  }
  //Esta funcion verifica que esta order pueda ser eliminada siempre y cuandon no tenga productos asignados si es así la elimina y elimina su indice de la tabla local.
  deleteOrder(id:any,IControl:any){

    Swal.fire({
      title: 'Are you sure you want to delete the Order?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete the order!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.DeleteOrder(id).subscribe(
          (resp) =>{
            if(resp.message==="The order you want to delete has a product assigned to it and cannot be deleted."){
              Swal.fire(
                'Error!',
                'The Order you want to delete has an assigned Products and cannot be deleted.',
                'error'
              )
            }else{
              this.Orders.splice(IControl,1);
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
  //Esta funcion de me trae todas las ordenes del servicio crudService
  GetAllOrder():any {
    this.crudService.GetAllOrder().subscribe(
      resp => {
        console.log(resp);
        this.Orders=resp;

      });
  }
}
