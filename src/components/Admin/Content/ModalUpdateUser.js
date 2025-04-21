import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../service/apiService';
import _ from 'lodash'

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImg, setPreviewImg] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImg("");
        props.resetUpdateData();
    };

    const handleUploadImg = (event) => {
        // console.log('>>Check:', event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitCreateUser = async () => {
        // call APIs
        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        // console.log("check res: ", data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUser()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    // console.log("Pass data user clicked from parent to child: ", props.dataUpdate)

    return (
        <>
            <Modal show={show} onHide={handleClose}
                animation={false}
                size='xl' backdrop="static"
                className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password:</label>
                            <input type="password" className="form-control" value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username:</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select className="form-select" value={role}
                                onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                <AiOutlinePlusCircle />
                                Upload file Image
                            </label>
                            <input type="file" id='labelUpload' hidden
                                onChange={(event) => { handleUploadImg(event) }} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImg ?
                                <img src={previewImg} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;