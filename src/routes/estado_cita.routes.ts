import { Router } from "express";
import { getallestado_citas } from "../controllers/estado_citas.controllers";
import { verifyToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router: Router = Router();

router.get(
  "/",
  verifyToken,
  authorize("GERENCIA"),
  getallestado_citas /* #swagger.security = [{
            "bearerAuth": []
    }] */,
);

export default router;
