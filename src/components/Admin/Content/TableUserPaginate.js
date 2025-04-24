import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
    const { listUser, pageCount } = props;

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1);
        console.log(">>Check fetchListUserWithPaginate + TbUserP:", props.fetchListUserWithPaginate(+event.selected + 1))
        props.setCurrentPage(+event.selected + 1);
        console.log(">>Check setCurrentPage + TbUserP:", props.setCurrentPage(+event.selected + 1))
        // console.log(`User requested page number ${event.selected}`);
    };
    return (
        <div>
            <table className="table table-bordered table-hover rounded-4 overflow-hidden mt-4 shadow">
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
            <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< Prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
        </div>
    )
}

export default TableUserPaginate;