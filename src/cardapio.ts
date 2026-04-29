

export interface Moedas{
    taxaCambio: number,
    imagenMoeda:string
}

export const catalogo:Record<string, Moedas> ={
    real:{
        taxaCambio: 10.00,
        imagenMoeda: ''
    },
    dolar:{
        taxaCambio: 4.998,
        imagenMoeda: ''
    },
    euro:{
        taxaCambio: 5.843,
        imagenMoeda: ''
    }
}