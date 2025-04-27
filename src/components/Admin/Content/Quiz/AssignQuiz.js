import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from "../../../../service/apiService"
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUser = async () => {
        let res = await getAllUser()
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`,
                }
            })
            setListUser(users)
        }
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="assign-quiz-container">
            <div className='col-6 form-group'>
                <label className='mb-2 tx'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group mt-3'>
                <label className='mb-2 tx'>Select User:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className='btn btn-outline-success mt-4'
                    onClick={() => handleAssign()}>
                    Assign
                </button>
            </div>
        </div>
    )
}

export default AssignQuiz;