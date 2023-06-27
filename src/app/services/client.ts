export interface $Client {

name: string,
lastName: string,
address: string,
dni: string,
email: string,
dateCreate?: string

}


export interface UpdateClienteI{

customer:$Client,
opt:number

}
