import { Router } from "express";
import playlistController from "~/controllers/playlist.controller";

const router = Router();

router.get("/", playlistController.findAll);
router.get("/:id", playlistController.findOne);
router.post("/", playlistController.create);
router.post("/playlistItems", playlistController.createPlaylistItem);
router.put("/:id", playlistController.update);
router.delete("/:id", playlistController.remove);
router.delete("/playlistItems/:id", playlistController.removePlaylistItem);

export default router;
