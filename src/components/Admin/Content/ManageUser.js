import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/apiService";
import { GoPlus } from "react-icons/go";
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        // console.log('>>>check res:', res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const handClickUpdateUser = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user)
        // console.log(">>Check pass data from child to parents", user)
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }

    const handClickDeleteUser = (user) => {
        // console.log("Check clicked:", user)
        setShowModalDeleteUser(true);
        setDataDelete(user);
        console.log("Set data delete:", setDataDelete(user))
    }

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
                <div className='table-users-container'>
                    <TableUser
                        listUser={listUser}
                        handClickUpdateUser={handClickUpdateUser}
                        handClickDeleteUser={handClickDeleteUser}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default ManageUser;