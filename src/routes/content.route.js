import { Router } from "express";
import auth from "~/middleware/auth";
import contentController from "~/controllers/content.controller";

const router = Router();

router.get("/", contentController.findAll);
router.get("/:id", contentController.findOne);
router.get("/path/:path", contentController.findOneByPath);
router.post("/", contentController.create);
router.put("/:id", auth, contentController.update);
router.delete("/:id", auth, contentController.remove);

export default router;
