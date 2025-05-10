import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { postUpdateProfile } from '../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { doUpdateUserSuccess } from '../../redux/action/userAction';

const PersonalInfo = (props) => {
    const { userData, handleCloseModal } = props; 

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);
    const [previewImg, setPreviewImg] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (userData &&!_.isEmpty(userData)) {
            setEmail(userData.email);
            setUsername(userData.username);
            setRole(userData.role);
            setImage("")
            if (userData.image) {
                setPreviewImg(`data:image/jpeg;base64,${userData.image}`);
            }
        }
    }, [userData])

    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSaveChanges = async () => {
        const res = await postUpdateProfile(username, image)
        if(res && res.EC === 0 ) {
            toast.success(res.EM);
            dispatch(doUpdateUserSuccess(res.DT));
            handleCloseModal();
        } 
        else {
            toast.error(res.EM);
        }
    };
    
    return (
        <form className="row g-3 mt-3">
             <div className="col-md-6">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value={email} disabled />
            </div>
            <div className="col-md-6">
                <label className="form-label">Role:</label>
                 <input type="text" className="form-control" value={role} disabled />
            </div>
            <div className="col-md-6">
                <label className="form-label">Username:</label>
                <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
              <div className="col-md-12">
                <label className="form-label label-upload d-flex align-items-center p-1 gap-1 fw-bold" htmlFor='labelUploadProfileInfo'>
                     <AiOutlinePlusCircle /> Upload file Image
                </label>
                <input type="file" id='labelUploadProfileInfo' hidden onChange={(event) => { handleUploadImg(event) }} />
             </div>
             <div className='col-md-12 img-preview d-flex justify-content-center'>
                {previewImg ? <img src={previewImg} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} /> : <span>Preview Image</span>}
             </div>

            <div className="col-12 text-end">
                 <Button variant="primary" onClick={handleSaveChanges}>
                     Save
                 </Button>
            </div>
        </form>
    );
}

export default PersonalInfo;