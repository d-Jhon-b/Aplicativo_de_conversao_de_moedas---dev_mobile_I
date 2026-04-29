import { catalogo } from "../moedas"

export const converter = (valor:number, de: keyof typeof catalogo, para: keyof typeof catalogo)=>{
    const valorConvertido = ((valor/catalogo[de].taxaCambio) * catalogo[para].taxaCambio).toFixed(2)
    return valorConvertido
}