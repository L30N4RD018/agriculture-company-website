export type User = {
    id: number
    name: string
    email: string
    role: string
}

export type Crop = {
    ID: number
    NOMBRE: string
    DESCRIPCIÓN: string
    CANTIDAD: number
    UBICACIÓN: string
}

export type Smallholding = { 
    ID: number
    TAMAÑO: string
    UBICACIÓN: string
    DELIMITACIÓN: boolean
}

export interface InputProps{
    required: boolean;
    placeholder?: string;
    for: string;
    options?: string[];
    defaultValue?: string;
}

export interface InputData {
    type: string;
    props: InputProps
}

export type monthlyCrops = {
    month: string,
    crops: number
}