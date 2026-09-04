import type { Request, Response } from "express";
import { pacienteModels } from "../models/pacientes.models";

export const allpacientes = async(req:Request , res:Response):Promise<void> => {
    try {
        const resultado = await pacienteModels.findall()
        res.json({datos: resultado})
    } catch (error) {
        
    }
}
export const findbyid = async(req:Request, res:Response):Promise<void> =>{
    try {
        const id = Number(req.params.id)
        const resultado = await pacienteModels.findbyId(id)
        res.status(201).json({data:resultado})
    } catch (error) {
        
    }
}
export const createpacientes= async(req:Request, res:Response):Promise<void> => {
    try {
        const {name_paciente, appaterno_paciente, apmaterno_paciente,email,telefono,fecha_nacimiento,genero} = req.body
        if(!name_paciente || !appaterno_paciente || !apmaterno_paciente || !email || !telefono || !fecha_nacimiento || !genero)
            res.status(400).json({error: "todo los campos son requeridos"})
        const resultado = await pacienteModels.create_paciente(name_paciente,appaterno_paciente,apmaterno_paciente,email,telefono,fecha_nacimiento,genero)
        res.status(200).json({data: resultado})
    } catch (error:any) {
        res.status(500).json({message: error})
    }
}