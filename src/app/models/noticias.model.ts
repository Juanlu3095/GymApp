import { Timestamp } from "firebase/firestore";

export interface noticias{
   
    imagen: string;
    texto: string;
    titulo: string;
    fecha: Timestamp;
    id?: string;
}