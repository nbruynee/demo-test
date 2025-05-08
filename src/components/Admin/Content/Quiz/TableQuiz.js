
const TableQuiz = (props) => {
    const { listQuiz, handleUpdate, handleDelete, fetchQuiz } = props;

    return (
        <>
            <table className="table table-hover table-bordered shadow-sm mt-2 rounded-4 overflow-hidden">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <button className="btn btn-outline-success me-2"
                                            onClick={() => handleUpdate(item)}>
                                            Update
                                        </button>
                                        <button className="btn btn-outline-danger"
                                            onClick={() => handleDelete(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default TableQuiz;