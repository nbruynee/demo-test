const TableUser = (props) => {
    const { listUser } = props;

    return (
        <div>
            <table className="table table-bordered table-hover rounded-4 overflow-hidden mt-4">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
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
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-outline-primary me-3">View</button>
                                        <button className="btn btn-outline-success me-3"
                                            onClick={() => props.handClickUpdateUser(item)}>
                                            Update
                                        </button>
                                        <button className="btn btn-outline-danger"
                                        onClick={() => props.handClickDeleteUser(item)}>
                                            Delete
                                        </button>
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