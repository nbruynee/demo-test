import { useEffect, useState } from "react";
import { getAllUser } from "../../../service/apiService";

const TableUser = () => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);
    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log('>>>check res:',res);
        if (res.EC === 0) {
            setListUser(res.DT);
        }
    }
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-outline-primary me-3">View</button>
                                        <button className="btn btn-outline-success me-3">Update</button>
                                        <button className="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUser && listUser.length === 0 &&
                        <tr colSpan={'4'}>
                            <td>Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableUser;