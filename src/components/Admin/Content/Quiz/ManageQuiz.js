import Select from 'react-select';
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
import { getAllQuizForAdmin, postCreateNewQuiz } from '../../../../service/apiService';
import { toast } from 'react-toastify';
import "./ManageQuiz.scss"
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);

    const [listQuiz, setListQuiz] = useState([]);

    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const fetchQuiz = async () => {
        setDataUpdate({});
        setDataDelete({});
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, [])

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitQuiz = async () => {
        // validate
        if (!name || !description) {
            toast.error("Name or Description is required");
            return;
        }
        // Call APIs
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        // console.log("Check res:", res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setType("")
            setImage("");
            fetchQuiz();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    const handleUpdate = (quiz) => {
        setDataUpdate(quiz);
        setIsShowModalUpdate(true);
    }

    const handleDelete = (quiz) => {
        setDataDelete(quiz);
        setIsShowModalDelete(true);
    }

    return (
        <div className="quiz-container">
            <div className="title">
                <span>Manage Quiz</span>
            </div>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add new Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new-container">
                            <fieldset className="border rounded-3 p-3 bg-white shadow-sm">
                                <legend className="float-none w-auto px-3">Add new quiz</legend>
                                <div className="form-floating mb-3">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Your quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)} />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Quiz description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)} />
                                    <label>Description</label>
                                </div>
                                <div className='mt-3'>
                                    <Select
                                        value={type}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                    />
                                </div>
                                <div className="more-actions mt-3 form-group">
                                    <label className='mb-2'>Upload image</label>
                                    <input
                                        type="file"
                                        className="form-control p-2"
                                        onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-success py-2 px-5'
                                        onClick={() => handleSubmitQuiz()}>
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <span>List Quiz</span>
                             <TableQuiz
                                 listQuiz={listQuiz}
                                 handleUpdate={handleUpdate}
                                 handleDelete={handleDelete}
                                 fetchQuiz={fetchQuiz}
                             />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Manage Q/A Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModalUpdateQuiz
                show={isShowModalUpdate}
                setShow={setIsShowModalUpdate}
                dataUpdate={dataUpdate}
                 fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />
             <ModalDeleteQuiz
                 show={isShowModalDelete}
                 setShow={setIsShowModalDelete}
                 dataDelete={dataDelete}
                 fetchQuiz={fetchQuiz}
             />
        </div>
    )
}

export default ManageQuiz;