import { Router } from "express";
import auth from "~/middleware/auth";
import fileController from "~/controllers/file.controller";

const router = Router();

router.post("/formData", fileController.uploadFormData);
router.post("/base64", fileController.uploadBase64);
router.post("/remove", fileController.remove);
// router.get('/list', auth, fileController.findAllList)
// router.get('/:id', auth, fileController.findOne)
// router.post('/', auth, fileController.create)
// router.put('/:id', auth, fileController.update)
// router.delete('/:id', auth, fileController.remove)

export default router;
