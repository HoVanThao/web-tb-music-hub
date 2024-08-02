import { diskUpload } from '../middleware/multerMiddleware.js';
import { addAlbum, listAlbum, deleteAlbum, updateAlbum } from "../controllers/albumController.js";
import { Router } from "express";
import { validateAlbumInput, validateIdParamAlbum } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/add', diskUpload.single('image'), validateAlbumInput, addAlbum);
router.get('/list', listAlbum);
router.delete('/:id', validateIdParamAlbum, deleteAlbum);
router.patch('/:id', diskUpload.single('image'), validateIdParamAlbum, validateAlbumInput, updateAlbum);

export default router;  