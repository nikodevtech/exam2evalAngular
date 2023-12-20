import { Candidato } from './candidato';
export interface Entrevista {
    id?: string;
    fechaEntrevista: string;
    candidatoQueAplica: string;
    puestoQueOferta: string;
    realizada?: boolean;
}
