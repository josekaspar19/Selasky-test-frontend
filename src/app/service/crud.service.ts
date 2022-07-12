import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { OrderDto } from '../models/Order';
import { ProductDto } from '../models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  API: string = environment.urlBackend;
  constructor(private clientHttp: HttpClient) { }

  AddUser(dataUser: User): Observable<any> {
    return this.clientHttp.post(`${this.API}users`, dataUser)

  }

  GetAllUser() {
    return this.clientHttp.get(`${this.API}users`)
  }

  GetUser(id: any): Observable<any> {
    return this.clientHttp.get(`${this.API}users/${id}`)
  }

  DeleteUser(id: any): Observable<any> {
    return this.clientHttp.delete(`${this.API}users/${id}`)
  }
  EditUser(dataUser: any, id: any): Observable<any> {
    return this.clientHttp.put(`${this.API}users/${id}`, dataUser)
  }

  GetAllOrder() {
    return this.clientHttp.get(`${this.API}orders`)
  }

  GetOrder(id: any): Observable<any> {
    return this.clientHttp.get(`${this.API}orders/${id}`)
  }

  AddOrder(dataOrder: OrderDto): Observable<any> {
    return this.clientHttp.post(`${this.API}orders`, dataOrder)
  }

  DeleteOrder(id: any): Observable<any> {
    return this.clientHttp.delete(`${this.API}orders/${id}`)
  }
  
  EditOrder(dataOrder: any, id: any): Observable<any> {
    return this.clientHttp.put(`${this.API}orders/${id}`, dataOrder)
  }
  
  AddProduct(dataProduct: ProductDto): Observable<any> {
    return this.clientHttp.post(`${this.API}products`, dataProduct)
  }

  EditProduct(dataProduct: any, id: any): Observable<any> {
    return this.clientHttp.put(`${this.API}products/${id}`, dataProduct)
  }
  
  GetProductOrder(id: any): Observable<any> {
    return this.clientHttp.get(`${this.API}products/order/${id}`);
  }

  DeleteProduct(id: any): Observable<any> {
    return this.clientHttp.delete(`${this.API}products/${id}`)
  }
}