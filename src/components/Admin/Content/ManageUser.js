import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { useState } from 'react';
import { GoPlus } from "react-icons/go";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage Users
            </div>
            <div className="users-content">
                <div className='btn-add-new'>
                    <button onClick={() => setShowModalCreateUser(true)}>
                        <GoPlus /> Add new user
                    </button>
                </div>
                <div>
                    Table users
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    )
}

export default ManageUser;