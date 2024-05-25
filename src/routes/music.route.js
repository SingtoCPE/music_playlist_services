import { Router } from "express";
import musicController from "~/controllers/music.controller";

const router = Router();

router.get("/", musicController.searchMusic);
// router.get("/:id", musicController.findOne);
// router.post("/", musicController.create);
// router.put("/:id", musicController.update);
router.delete("/:id", musicController.remove);

export default router;
