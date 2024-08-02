import React, { useState, useEffect } from 'react';
import { assets } from '../assets/staticImage/assets.js';
import { Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/AddSong.js';
import SubmitBtn from '../components/SubmitBtn.jsx';
import FormRow from '../components/FormRow.jsx';
import FormRowSelect from '../components/FormRowSelect.jsx';

const AddSong = () => {
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [albumData, setAlbumData] = useState([]);

    useEffect(() => {
        // Hàm loadAlbumData sẽ ở đây
    }, []);

    return (
        <Wrapper>
            <Form method='post' className='form' encType='multipart/form-data'>
                {/* <h4 className='form-title'>Add Song</h4> */}
                <div className='form-center'>

                    <div className='upload-section'>
                        <div className='upload-item'>
                            <p>Upload song</p>
                            <input type="file" id='song' accept='audio/*' hidden />
                            <label htmlFor="song" className='form-label'>
                                <img src={song ? assets.upload_added : assets.upload_song} className='upload-icon' alt='' />
                            </label>
                        </div>
                        <div className='upload-item'>
                            <p>Upload Image</p>
                            <input type="file" id='image' accept='image/*' hidden />
                            <label htmlFor="image" className='form-label'>
                                <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='upload-icon' alt='' />
                            </label>
                        </div>
                    </div>

                    <FormRow type='text' name='name' labelText='Song name' defaultValue={name} />
                    <FormRow type='text' name='desc' labelText='Song description' defaultValue={desc} />
                    <FormRowSelect
                        labelText='Album'
                        name='album'
                        defaultValue={album}
                        list={Object.values(albumData)}
                    />
                    <SubmitBtn formBtn ten={'Thêm mới'} />
                </div>
            </Form>
        </Wrapper>
    );
}

export default AddSong;
