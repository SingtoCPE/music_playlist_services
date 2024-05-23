import { Router } from "express";
import auth from "~/middleware/auth";
import employeeController from "~/controllers/employee.controller";

const router = Router();

router.get("/", auth, employeeController.findAll);
router.get("/:id", auth, employeeController.findOne);
router.post("/", employeeController.create);
router.post("/login", employeeController.login);
router.put("/:id", auth, employeeController.update);
router.delete("/:id", auth, employeeController.remove);

export default router;
