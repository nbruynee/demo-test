import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../service/apiService";
import { GoPlus } from "react-icons/go";
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';

const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);


    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        // console.log('>>>check res:', res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        // console.log('>>>check res:', res);
        if (res.EC === 0) {
            // console.log("Check get user paginate:", res.DT.users)
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages)
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
        // console.log("Set data delete:", setDataDelete(user))
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
                    {/* <TableUser
                        listUser={listUser}
                        handClickUpdateUser={handClickUpdateUser}
                        handClickDeleteUser={handClickDeleteUser}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handClickUpdateUser={handClickUpdateUser}
                        handClickDeleteUser={handClickDeleteUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;