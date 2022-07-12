import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})

export class AddOrderComponent implements OnInit {
  formOrder: FormGroup;
  Products:any[] = [];
  ValueUnit:any;
  Unit:any;
  Description:any;
  SKU:any;
  Quantity:any;
  QtyBox:any;
  Weight:any;
  Volumen:any;
  Mark:any;
  Status:any;
  IdOrder:any = 0;
  IdOrderL:any = 0;
  Users:any = 0;
  IdUser:any;
  Name:any;

  constructor(
    public form:FormBuilder,
    private crudService:CrudService,
    private route:Router,
    ) { 

      this.formOrder=this.form.group({
        IdUser:[''],
        OrderNumber:[''],
        DateTime:[''],
        Time:[''],
        ProviderName:[''],
        Observation:[''],
        TotalValue:[''],
        Status:['']
      });

      this.ValueUnit = '';
      this.Unit = '';
      this.Description = '';
      this.SKU = '';
      this.Quantity = '';
      this.QtyBox = '';
      this.Weight = '';
      this.Volumen = '';
      this.Mark = '';
      this.Status = '';
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
//Esta función me trae a todos los usuarios utilizando el servicio crudService.
  getAllUsers():any {
    this.crudService.GetAllUser().subscribe(
      resp => {
        this.Users = resp;
        console.log(this.Users);
      });
  }
  //Esta función me elimina a un usuario en especifico envio el IControl para borrar el dato en la tabla y envio el id del data utilizando el servicio crudService.
  deleteOrder(IControl:any, ValueUnit:any){
    this.Products.splice(IControl,1);

  const index = this.Products.findIndex(object => {
  return object.IdOrder === this.IdOrder;
  
});

this.Products.splice(index,0);
this.Products[0]
  }
  //Función utilizada para recepcionar la data de los inputs del formulario AddOrder y insertarlos en mi backend con el servicio crudService.
  sendData():any {
    console.log(this.formOrder.value);
    this.formOrder.value.DateTime = this.formOrder.value.DateTime +' '+this.formOrder.value.Time+':00';
    console.log(this.formOrder.value.DateTime);
    // this.crudService.AddOrder(this.formOrder.value).subscribe();
    this.crudService.AddOrder(this.formOrder.value).subscribe(
      resp => {
        console.log(this.formOrder.value);
        console.log(resp);
        if(resp.message !== 'Order added!!!'){
          console.log(resp);
        }else{
          // this.route.navigateByUrl('/list-user');
          this.IdOrderL = resp.id;
          this.sendProduct(this.IdOrderL);
        }

        // this.Email = "";
        // this.Status = 0;
        // console.log(resp);
      }
    );
  }
//Esta función me limpia todos los inputs del formulario addOrder.
  clean(){
    this.ValueUnit = '',
    this.Unit = '',
    this.Description = '',
    this.SKU = '',
    this.Quantity = '',
    this.QtyBox = '',
    this.Weight = '',
    this.Volumen = '',
    this.Mark = ''
    this.Status = ''
  }

  //Esta funcion me agrega los productos de una manera local hasta que la function addOrder sea ejecutada esto se debe a que no podemos agregar productos sin tener un IdOrder antes de ejecutar.
  addProduct(){
    this.IdOrder++;
    console.log(this.ValueUnit);
    this.Products.push({
      "IdOrder": this.IdOrder,
      "ValueUnit": this.ValueUnit,
      "Unit": this.Unit,
      "Description": this.Description,
      "SKU": this.SKU,
      "Quantity": this.Quantity,
      "QtyBox": this.QtyBox,
      "Weight": this.Weight,
      "Volumen": this.Volumen,
      "Mark": this.Mark,
      "Status": this.Status
    });


    // this.crudService.AddOrder(this.Products[0]).subscribe(
    //   resp => {
    //     console.log(resp);
    //     if(resp.message !== 'Order added!!!'){
    //       console.log(resp);
    //     }else{
    //       // this.route.navigateByUrl('/list-user');
    //     }

    //     // this.Email = "";
    //     // this.Status = 0;
    //     // console.log(resp);
    //   }
    // );

    // console.log('PRODUCTO'+typeof(this.Products));

    // Swal.fire({
    //   icon: 'success',
    //   title: 'You have successfully added the user!',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
  }
//Esta función agrega a los productos previamente de haber obtenido el IdOrder
  sendProduct(IdOrderL:any){
    console.log(this.Products.length);
    if(this.Products.length<1){
      
      Swal.fire({
        icon: 'success',
        title: 'You have successfully added the Order!',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigateByUrl('/list-order');
    }else{

      console.log(IdOrderL);
      for (let index = 0; index < this.Products.length; index++) {
        this.Products[index]['IdOrder'] = IdOrderL;
        const element = this.Products[index];
        
        this.crudService.AddProduct(this.Products[index]).subscribe(
          resp => {
            console.log(resp);
            console.log(resp.message);
            if(resp.message !== 'Product added!!!'){
              console.log(resp);
            }else{
                  Swal.fire({
        icon: 'success',
        title: 'You have successfully added the Order!',
        showConfirmButton: false,
        timer: 1500
      })
               this.route.navigateByUrl('/list-order');
  
            }
    
            // this.Email = "";
            // this.Status = 0;
            // console.log(resp);
          }
        );
  
        
        console.log('INDEX'+index);
        console.log(element); 
      }
      
    }

  }

}
