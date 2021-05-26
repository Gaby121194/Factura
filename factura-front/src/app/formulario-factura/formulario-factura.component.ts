import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-formulario-factura',
  templateUrl: './formulario-factura.component.html',
  styleUrls: ['./formulario-factura.component.scss']
})
export class FormularioFacturaComponent implements OnInit {
  total: number = 0;
  id: number = 0; 
  productos: Producto[] = new Array<Producto>();
  productosAgregados: Producto[] = new Array<Producto>();
  constructor(private fb: FormBuilder, private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.listProductos()
  }

  formularioFactura: FormGroup = this.fb.group({
    nombreCliente: ['', Validators.required],
    compañiaCliente: ['', Validators.required],
    ciudadCliente: ['', Validators.required],
    telefonoCliente: ['', Validators.required]
  })

  formularioProducto: FormGroup = this.fb.group({
    productoNombre: ['', Validators.required],
    productoDescripcion: ['', Validators.required],
    cantidad: ['', Validators.required],
    precio: ['', Validators.required],
  })

  fecha : Date = new Date(Date.now())
  dia: any = this.fecha.getDate()
  mes: any = this.fecha.getMonth()
  anio: any = this.fecha.getFullYear()



  

  agregar(){
    let formulario = this.formularioProducto.value
    let producto : Producto = new Producto()
    producto.nombreProducto = formulario.productoNombre
    producto.descripcionProducto = formulario.productoDescripcion
    producto.cantidad = formulario.cantidad
    producto.costo = formulario.precio
    producto.subtotal = producto.cantidad * producto.costo
    this.total += producto.cantidad * producto.costo

    this.productosAgregados.push(producto)
    
  

    
  }

  facturar(){
    let factura = this.formularioFactura.value
    factura.productos = this.productosAgregados
    factura.fecha = this.fecha
    

    console.log(factura)

    if (this.formularioFactura.valid){
      this.facturaService.create(this.formularioFactura.value).subscribe(
        () => console.log("se creo con exito")
      )
    }

  }

  listProductos(){
    this.facturaService.getProducts().subscribe(s=> this.productos= s)
  }

  cambiovalor(id: string) {
    console.log(id)
  }


}
