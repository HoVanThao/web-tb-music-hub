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

const updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { name, desc, bgColour } = req.body;

    const album = await albumModel.findById(id);
    if (!album) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Album không tồn tại" });
    }

    let updates = { name, desc, bgColour };

    // Nếu có file image mới, upload và cập nhật
    if (req.file) {
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        updates.image = imageUpload.secure_url;
    }

    // Xóa các giá trị undefined trong đối tượng cập nhật
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const updatedAlbum = await albumModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });

    res.status(StatusCodes.OK).json({ msg: "Cập nhật thành công", album: updatedAlbum });
};

export { addAlbum, listAlbum, deleteAlbum, updateAlbum }