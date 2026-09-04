import type { Request, Response } from "express";
import { estado_citaModels } from "../models/estado_citas.models";

export const getallestado_citas = async(req:Request, res:Response):Promise<void> => {
    try {
    const resutado = await estado_citaModels.findall()
    res.json({datos: resutado})
        
    } catch (error:any) {
        res.status(500).json({message:error})
    }
}
