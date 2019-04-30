import { Evento } from "./evento";

export class Labor {
    id: number;
    terminalid: number;
    maqid: number;
    nombre: String;
    operador: String;
    nroorden: number;
    parteid: number;
    parte: String;
    inicio: Date;
    final: Date;
    aptas: number;
    rechazos: number;
    terminadas: number;
    observacion: String;
    iniciopap: Date;
    duracionpap: number;
    iniciomec: Date;
    duracionmec: number;
    inicioope: Date;
    duracionope: number;
    eventos: Evento[];
}