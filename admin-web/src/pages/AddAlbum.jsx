import React, { useState } from 'react';
import { assets } from '../assets/staticImage/assets.js';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/AddAlbum.js';
import FormRow from '../components/FormRow.jsx';
import SubmitBtn from '../components/SubmitBtn.jsx';

const AddAlbum = () => {
    const [image, setImage] = useState(false);
    const [colour, setColour] = useState("#121212");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        setLoading(true);

        // try {
        //     const formData = new FormData();
        //     formData.append('name', name);
        //     formData.append('desc', desc);
        //     formData.append('image', image);
        //     formData.append('bgColour', colour);

        //     const response = await axios.post(`${url}/api/album/add`, formData);

        //     if (response.data.success) {
        //         toast.success("Album added");
        //         setName("");
        //         setDesc("");
        //         setImage(false);
        //     } else {
        //         toast.error("Có lỗi xảy ra");
        //     }
        //     setLoading(false);
        // } catch (error) {
        //     toast.error("Error occurred");
        //     setLoading(false);
        // }
    };

    return (
        <Wrapper>
            {loading ? (
                <div className='loading'>
                    <div className='spinner'></div>
                </div>
            ) : (
                <Form className='form'>
                    <div className='upload-section'>
                        <div className='upload-item'>
                            <p>Upload Image</p>
                            <input type="file" id='image' accept='image/*' hidden />
                            <label htmlFor="image">
                                <img className='upload-icon' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                            </label>
                        </div>
                    </div>

                    <FormRow type='text' name='name' labelText='Album name' defaultValue={name} />
                    <FormRow type='text' name='desc' labelText='Album description' defaultValue={desc} />

                    <div className='form-color'>
                        <p>Background Colour</p>
                        <input value={colour} type="color" />
                    </div>
                    <SubmitBtn formBtn ten={'Thêm mới'} />
                </Form>
            )}
        </Wrapper>
    );
};

export default AddAlbum;
