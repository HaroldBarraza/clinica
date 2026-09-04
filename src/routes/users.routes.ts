import { Router } from "express";
import {
  getmedicosbyespecialidad,
  getUsers,
  updateuser,
} from "../controllers/users.controller";
import { validardatos } from "../middleware/validardatos";
import { validardatosquery } from "../middleware/validatequery";
import {
  findespecialidadschema,
  updateuserschema,
} from "../schemas/user.schema";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = Router();

router.get(
  "/",
  verifyToken,
  authorize("GERENCIA", "RECEPCIONISTA"),
  getUsers /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);
router.get(
  "/medicos",
  verifyToken,
  authorize("GERENCIA"),
/*   validardatosquery(findespecialidadschema), */
  getmedicosbyespecialidad /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);

router.put("/:id", verifyToken, validardatos(updateuserschema), updateuser/* #swagger.security = [{
            "bearerAuth": []
    }] */);

export default router;
