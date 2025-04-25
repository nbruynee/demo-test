import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { FiPlusCircle } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";


const Questions = (props) => {
    const [selectQuiz, setSelectQuiz] = useState({})

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    return (
        <div className="question-container">
            <div className="title">
                <span>Manage Questions</span>
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2 tx'>Select Quiz:</label>
                    <Select
                        value={selectQuiz}
                        onChange={setSelectQuiz}
                        options={options}
                    />
                </div>
                <div className='mt-3'>
                    <span className='tx'>Add Question:</span>
                </div>
                <div>
                    <div className='question-content'>
                        <div className="form-floating description">
                            <input type="type" className="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-upload'>Upload Image:</label>
                            <input type={'file'} hidden />
                            <span>MyImage.png</span>
                        </div>
                        <div className='btn-container'>
                            <span>
                                <FiPlusCircle className='btn-add' />
                            </span>
                            <span>
                                <BsTrash className='btn-delete' />
                            </span>
                        </div>
                    </div>
                    <div className='answer-content'>
                        <input
                            className="form-check-input size-fx"
                            type="checkbox"
                        />
                        <div className="form-floating width">
                            <input type="type" className="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-container'>
                            <span>
                                <FiPlusCircle className='btn-add' />
                            </span>
                            <span>
                                <AiOutlineMinusCircle className='btn-delete' />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Questions;