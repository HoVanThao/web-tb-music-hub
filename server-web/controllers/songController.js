import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/SongModel.js'
import { StatusCodes } from 'http-status-codes';

const addSong = async (req, res) => {

    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(audioUpload.duration % 60)}`;

    const songData = {
        name,
        desc,
        album,
        image: imageUpload.secure_url,
        file: audioUpload.secure_url,
        duration
    }

    const song = await songModel.create(songData);
    res.status(StatusCodes.CREATED).json({ msg: "Thêm mới thành công", song });

}

const listSong = async (req, res) => {
    const songs = await songModel.find({});
    res.status(StatusCodes.OK).json({ songs })
}

const deleteSong = async (req, res) => {
    const removeSong = await songModel.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Xóa thành công", song: removeSong })
}

const updateSong = async (req, res) => {

    const { id } = req.params;
    const { name, desc, album } = req.body;

    const song = await songModel.findById(id);
    if (!song) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Bài hát không tồn tại" });
    }

    let updates = { name, desc, album };

    if (req.files && req.files.audio) {
        const audioFile = req.files.audio[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        updates.file = audioUpload.secure_url;
        updates.duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(audioUpload.duration % 60)}`;
    }

    if (req.files && req.files.image) {
        const imageFile = req.files.image[0];
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        updates.image = imageUpload.secure_url;
    }

    // Xóa các giá trị undefined trong đối tượng cập nhật
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    const updatedSong = await songModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });

    res.status(StatusCodes.OK).json({ msg: "Cập nhật thành công", song: updatedSong });

};

export { addSong, listSong, deleteSong, updateSong }

