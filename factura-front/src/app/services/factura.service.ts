import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor( protected httpClient : HttpClient){
  }
 
  public create(entity: any) : Observable<Factura>  {
    return this.httpClient.post<Factura>(`http://localhost:9000/api/v1/facturas`,entity);      
  }

  public getProducts(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`http://localhost:9000/api/v1/productos`);
  }
  
  
}
