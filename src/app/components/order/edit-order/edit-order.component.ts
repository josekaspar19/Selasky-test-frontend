import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CrudService } from 'src/app/service/crud.service';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderDto } from 'src/app/models/Order';
import * as moment from 'moment';
import { ProductDto } from '../../../models/Product';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  action: any = 0;
  order: OrderDto = new OrderDto();
  product: ProductDto = new ProductDto();
  productTbl: any[] = [];
  ValueUnit: any;
  Unit: any;
  Description: any;
  SKU: any;
  Quantity: any;
  QtyBox: any;
  Weight: any;
  Volumen: any;
  Mark: any;
  Status: any;
  IdOrder: any = 0;
  IdOrderL: any = 0;
  Users: any = 0;
  IdUser: any;
  Name: any;
  time: any | undefined;
  date: any | undefined;
  constructor(
    public form: FormBuilder,
    private activeRoute: ActivatedRoute,
    private crudService: CrudService,
    private route: Router
  ) {
    const orderId: any = this.activeRoute.snapshot.paramMap.get('id');
    this.crudService.GetOrder(orderId).subscribe(resp => {
      this.order = OrderDto.fromJS(resp[0]);
      this.time = this.order.dateTime.format('HH:mm');
      this.date = this.order.dateTime.format('YYYY-MM-DD');
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
    this.GetProductOrder()
  }
//Esta funcion me trae los productos y los desplega en la tabla local dependiendo el ID del IdOrder.
  GetProductOrder() {
    this.productTbl = [];
    const orderId: any = this.activeRoute.snapshot.paramMap.get('id');
    this.crudService.GetProductOrder(orderId).subscribe(resp => {
      console.log(this.productTbl);
      for (let index = 0; index < resp.length; index++) {
        this.productTbl.push({
          "IdOrdersProducts": resp[index]['IdOrdersProducts'],
          "IdOrder": resp[index]['IdOrder'],
          "ValueUnit": resp[index]['ValueUnit'],
          "Unit": resp[index]['Unit'],
          "Description": resp[index]['Description'],
          "SKU": resp[index]['SKU'],
          "Quantity": resp[index]['Quantity'],
          "QtyBox": resp[index]['QtyBox'],
          "Weight": resp[index]['Weight'],
          "Volumen": resp[index]['Volumen'],
          "Mark": resp[index]['Mark'],
          "Status": resp[index]['Status']
        });
      }
      // this.ValueUnit = resp[0]['ValueUnit'];
      console.log(this.productTbl);
    });
  }

  //Esta funcion me toma los datos de los inputs y los Actualiza
  updateOrder() {

    let sendOrder: OrderDto = new OrderDto(this.order);
    // sendOrder.dateTime = moment(`${this.date} ' ' ${this.time}`);
    sendOrder.dateTime.format('YYYY-MM-DD HH:MMM');
    // console.log(this.date);
    // console.log(this.time);
    const dateFormat = `${this.date} ${this.time}`;
    dateFormat.toString();

    // console.log(sendOrder);
    // console.log(typeof (sendOrder.dateTime));
    const _body: any = sendOrder.toJSON();
    _body.DateTime = dateFormat;
    // console.log(_body);
    this.crudService.EditOrder(_body, this.order.idOrder).subscribe(resp => {
      Swal.fire(
        'Updated!',
        'The Order has been updated.',
        'success'
      )
      // console.log(resp);
    });
  }
//Esta funcion me toma los datos de los inputs de producto y me agrega un producto acutaliza la bdd, limpia los inputs y me trae los nuevos datos de la BDD.
  addProduct(){
    let sendProduct: ProductDto = new ProductDto(this.product);
    const orderId: any = this.activeRoute.snapshot.paramMap.get('id');
    sendProduct.idOrder = orderId;
    const _body: any = sendProduct.toJSON();
    console.log(_body);
    this.crudService.AddProduct(_body).subscribe(resp => {
      Swal.fire(
        'Add Product!',
        'The Product has been Added.',
        'success'
      )
      // console.log(resp);
    });
    // this.ValueUnit;
setTimeout(() => {
  this.GetProductOrder();
  this.clean();
}, 1500);

  }
//Esta función con el boton EDIT toma los datos de la tabla local, los coloca en los inputs, cambia los botones para que solo se pueda actualizar y luego actualiza los datos y vuelve a su manera original.
  updateProduct(){
    let sendProduct: ProductDto = new ProductDto(this.product);
    const orderId: any = this.activeRoute.snapshot.paramMap.get('id');
    sendProduct.idOrder = orderId;
    // console.log(sendProduct);
    // sendProduct.idOrdersProducts = producto.IdOrdersProducts;
    const _body: any = sendProduct.toJSON();

    // console.log(_body);

    this.crudService.EditProduct(_body, this.product.idOrdersProducts).subscribe(resp => {
      Swal.fire(
        'Updated!',
        'The Product has been updated.',
        'success'
      )
      setTimeout(() => {
        this.GetProductOrder();
        this.cancel();
      }, 1500);
      // console.log(resp);
    });


  }
//Esta función toma los datos de la tabla local y me los pasa a mi MODELDTO de Product
  editProduct(producto:any){
    console.log(producto);
    this.action = 1;
    this.product.valueUnit = producto.ValueUnit,
    this.product.unit = producto.Unit,
    this.product.description = producto.Description,
    this.product.sku = producto.SKU,
    this.product.quantity = producto.Quantity,
    this.product.qtyBox = producto.QtyBox,
    this.product.weight = producto.Weight,
    this.product.volumen = producto.Volumen,
    this.product.mark = producto.Mark,
    this.product.status = producto.Status,
    this.product.idOrdersProducts = producto.IdOrdersProducts

  }
//Esta función pone los campos vacios.
  clean(){
    this.product.valueUnit = 0,
    this.product.unit = 0,
    this.product.description = '',
    this.product.sku = '',
    this.product.quantity = 0,
    this.product.qtyBox = 0,
    this.product.weight = 0,
    this.product.volumen = 0,
    this.product.mark = '',
    this.product.status = ''
  }
  //esta función me modifica mi action para que cambie los botones y el estado de editando a agregando, ademas me limpia todos los campos.
  cancel(){
    this.action = 0;
    this.product.valueUnit = 0,
    this.product.unit = 0,
    this.product.description = '',
    this.product.sku = '',
    this.product.quantity = 0,
    this.product.qtyBox = 0,
    this.product.weight = 0,
    this.product.volumen = 0,
    this.product.mark = '',
    this.product.status = ''
  }
//Esta función toma el id del producto y lo mando a mi servicio para eliminar ademas también se elimina de manera local para no sobre cargar la bdd con peticiones.
  deleteOrder(id: any, IControl: any) {

    Swal.fire({
      title: 'Are you sure you want to delete the Product?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete the Product!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.DeleteProduct(id).subscribe(
          (resp) => {
            if (resp.message === "The order you want to delete has a product assigned to it and cannot be deleted.") {
              Swal.fire(
                'Error!',
                'The Order you want to delete has an assigned Products and cannot be deleted.',
                'error'
              )
            } else {
              this.productTbl.splice(IControl, 1);
              Swal.fire(
                'Deleted!',
                'The Product has been deleted.',
                'success'
              )
            }

            console.log(resp);
          });
      }
    })
  }

//Esta función no permite colocar en el campo otra cosa que no sean numeros.
  keyUpOnlyNumber(event: any) {
    event.target.value = this.zfillDecimal(event.target.value.replace(/[^0-9]/g, ""));
  }
//esta función solo permite presionar numeros
  keyPressOnlyNumbers(event: any) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
//Esta función mide la cantidad de datos que yo deseo atravez del length
  changeQuantityLength(event: any, maxValue: number, length: number) {
    event.target.value = this.zfill(event.target.value.replace(',', '.'), true, length);
    if (maxValue && (+(event.target.value.replace(',', '.')) > maxValue))
      event.target.value = this.zfill(maxValue.toString(), true, length);
  }
//Esta función me permite trabajar con decimales.
  changeDecimal(event: any, applyLength: boolean, length: number) {

    if ((((event.which != 44 && event.which != 46) || (event.which == this.decimalDivisorKey && event.target.value == '')) ||
      (event.target.value.indexOf(".") != -1 || event.target.value.indexOf(",") != -1)) && (event.which < 48 || event.which > 57))
      event.preventDefault();

    let arrayNumbers = event.target.value.split(this.decimalDivisor);
    if (arrayNumbers.length > 1 && arrayNumbers[1].length >= (applyLength ? length : this.decimalCount))
      event.preventDefault();

    event.target.value = event.target.value.replace(',', '.');
  }

  get decimalDivisor(): string {
    return ".";
  }

  get decimalDivisorKey(): number {
    return 46;
  }

  private zfillDecimal(numbers: any) {
    const text: string = numbers.toString().replace(this.divisorReversed, this.divisor);

    if (text == this.divisor)
      return '';

    const array: string[] = Array.from(text);
    const index: number = text.lastIndexOf(this.divisor);

    if (index == -1) {
      const onlyzeros = array.findIndex(p => p != '0') == -1;

      return onlyzeros && array.length > 0 ? array[0] : text.replace(/\D|^0+/g, '');
    }

    const numbersLeft: string[] = array.slice(0, index).filter(p => p != this.divisor && p != this.divisorReversed);
    const numbersRight: string[] = array.slice(index).filter(p => p != this.divisor && p != this.divisorReversed);

    return numbersLeft.join('') + this.divisor + numbersRight.join('');

  }

  zfill(number: any, applyFormat: boolean, length: number) {
    let isDot = number.lastIndexOf('.') != -1 && number.lastIndexOf('.') == (number.length - 1);
    //remover extra dots 
    if (isDot) {
      let index = 0;
      for (let letter of Array.from(number))
        if (letter == '.')
          index++;

      if (index > 1) {
        const tempNumber = number.split('.');
        number = tempNumber[0] + '.' + tempNumber[1];
        isDot = number.lastIndexOf('.') != -1 && number.lastIndexOf('.') == (number.length - 1);
      }
    }

    let returnNumber = (+number).toString();

    if (isNaN(+number))
      return "0";

    if (isDot)
      return returnNumber + (isDot ? this.decimalDivisor : '');
    else {

      let arrayNumbers = returnNumber.split(this.decimalDivisor);
      if (arrayNumbers.length > 1 && arrayNumbers[1].length > (applyFormat ? length : this.decimalCount))
        return (+returnNumber).toLocaleString(this.lang, {
          minimumFractionDigits: applyFormat ? length : this.decimalCount,
          maximumFractionDigits: applyFormat ? length : this.decimalCount
        });

      return Math.trunc(Math.abs(+number)) + (isDot ? this.decimalDivisor : this.getZeroLeftSide(number));
    }

  }

  getZeroLeftSide(numbers: any): string {
    let array: string[] = Array.from(numbers);
    let finded: boolean = false;
    let returned: string[] = [];
    for (let value of array) {
      if (value == this.decimalDivisor)
        finded = true;
      if (finded)
        returned.push(value);
    }
    return returned.length == 0 ? '' : returned.join('');
  }

  get divisor(): string {
    return '.';//this.appSession.application.divisor;
  }

  get divisorReversed(): string {
    return this.divisor == this.dotSeparator ? this.commaSeparator : this.dotSeparator;
  }

  get divisorKey(): number {
    //44 comma, 46 dot
    return this.divisor == "." ? 46 : 44;
  }

  get commaSeparator(): string {
    return ',';
  }

  get dotSeparator(): string {
    return '.';
  }

  get decimalCount(): number {
    return 2;//this.appSession.application.decimal;
  }

  get maxIntValue(): number {
    return 2147483647;
  }

  get lang(): string {
    return 'en-US';//this.appSession.application.lang;
  }

  get numberFormat(): string {
    return '1.2-2';//this.appSession.application.format;
  }
}
