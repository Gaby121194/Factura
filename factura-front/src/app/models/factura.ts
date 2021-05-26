import { Producto } from "./producto";

export class Factura{
    id!: Number;
    fecha!: Date;
    nombreCliente!: string;
    compañiaCliente!: string;
    ciudadCliente!: string;
    telefonoCliente!: number;
    productos!: Producto[];
}