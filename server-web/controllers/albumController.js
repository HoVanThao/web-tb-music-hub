import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'
import { StatusCodes } from 'http-status-codes'

const addAlbum = async (req, res) => {

    const name = req.body.name;
    const desc = req.body.desc;
    const bgColour = req.body.bgColour;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    const albumData = {
        name,
        desc,
        bgColour,
        image: imageUpload.secure_url
    }

    const album = await albumModel.create(albumData);

    res.status(StatusCodes.CREATED).json({ msg: "Tạo mới thành công", album });

}

const listAlbum = async (req, res) => {
    const albums = await albumModel.find({});
    res.status(StatusCodes.OK).json({ albums })
}

const deleteAlbum = async (req, res) => {
    const removeAlbum = await albumModel.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Xóa thành công", album: removeAlbum })
}

export { addAlbum, listAlbum, deleteAlbum }