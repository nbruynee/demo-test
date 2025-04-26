import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { FiPlusCircle } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "react-awesome-lightbox";
import _ from "lodash"
import "react-awesome-lightbox/build/style.css";

const Questions = (props) => {
    const [selectQuiz, setSelectQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    })

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ]
            },
        ]
    )

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleAddRemoveQuestion = (type, id) => {
        // console.log("Check type:", type, "id: ", id)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, qId, aId) => {
        // console.log("Check type:", type, "Question id: ", qId, "Answer", aId)
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            let index = questionsClone.findIndex(item => item.id === qId);
            questionsClone[index].answers.push(newQuestion);
            setQuestions(questionsClone);
        };
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === qId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aId)
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);

            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > - 1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeFile = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);

        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > - 1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            // console.log("Check file:", event.target.files[0]);
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > - 1) {
            questionsClone[index].answers.map((answer) => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return (answer)
            })
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestionForQuiz = () => {

    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }
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
                {questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className='q-container'>
                                <div className='tx-container'>
                                    <span className='tx'>Add Question:</span>
                                </div>
                                <div className='question-content'>
                                    <div className="form-floating description">
                                        <input type="type"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)} />
                                        <label>Question {index + 1} description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label className='label-upload' htmlFor={`${question.id}`}>
                                            <IoImageOutline />
                                        </label>
                                        <input type={'file'}
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeFile(question.id, event)}
                                            hidden />
                                        <span>
                                            {
                                                question.imageName ?
                                                    <span
                                                        onClick={() => handlePreviewImage(question.id)}>
                                                        {question.imageName}
                                                    </span>
                                                    :
                                                    'No file upload'
                                            }
                                        </span>
                                    </div>
                                    <div className='btn-container'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <FiPlusCircle className='btn-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsTrash className='btn-delete' />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content'>
                                                <input
                                                    className="form-check-input size-fx"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating width">
                                                    <input type="type"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-container'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <FiPlusCircle className='btn-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='btn-delete' />
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div className='mt-4'>
                        <button className='btn btn-outline-success'
                            onClick={() => handleSubmitQuestionForQuiz()}>
                            Save Question
                        </button>
                    </div>
                }
                {isPreviewImage === true &&
                    <Lightbox image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    />
                }
            </div>
        </div>
    )
}

export default Questions;