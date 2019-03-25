import { Terminal } from './terminal';
import { Listado } from './listado';

export class Maquina {
    id: number;
    nombre: String;
    tipo: String;
    pap: boolean;
    aterminar: boolean;
    activa: boolean;
    terminal: Terminal;
    listados: Listado[];
}
