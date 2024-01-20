export interface IFactura {
    ID_factura: number;
    ID_cliente: number;
    Fecha_emision?: Date;
    Total: number;
    Estado: string;
    cliente: string;
}
