import type { Request, Response } from "express";
import { usersModels } from "../models/users.models";
import { error } from "node:console";

export const getUsers = async(req: Request, res: Response):Promise<void> => {
    try {
        const resultado = await usersModels.findall()
        res.json({data:resultado})
    } catch (error_any) {
        res.status(500).json({error: "hubo un error con la bases"})
    }
}  