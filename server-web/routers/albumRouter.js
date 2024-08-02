import { diskUpload } from '../middleware/multerMiddleware.js';
import { addAlbum, listAlbum, deleteAlbum } from "../controllers/albumController.js";
import { Router } from "express";
import { validateAlbumInput, validateIdParamAlbum } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/add', diskUpload.single('image'), validateAlbumInput, addAlbum);
router.get('/list', listAlbum);
router.delete('/:id', validateIdParamAlbum, deleteAlbum);

export default router;  