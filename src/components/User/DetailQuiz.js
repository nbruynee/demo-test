import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash"
import "./DetailQuiz.scss"
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


const DetailQuiz = (props) => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    const params = useParams();
    // console.log("Chech params:", params)
    const location = useLocation();
    // console.log("Check location:", location);
    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log(`Check res:`, res)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    // console.log("Check value:", value, "Check key:", key)
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                        // console.log("Check anwers:", item.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return {
                        questionId: key,
                        answers,
                        questionDescription,
                        image
                    }
                })
                .value()
            // console.log("Check data", data);
            setDataQuiz(data)
        }
    }

    const handlePrevious = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            // console.log("Check q:", question);
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }


    const handleSubmitQuiz = async () => {
        // console.log(">>>Check data before submit:", dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];
                question.answers.forEach(ans => {
                    if (ans.isSelected === true) {
                        userAnswerId.push(ans.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                })
            })
            payload.answers = answers;
            // console.log(">Check payload:", payload)
            //submit APIs
            let res = await postSubmitQuiz(payload);
            // console.log(">>Check res:", res)
            if (res && res.EC === 0) {
                setIsSubmitQuiz(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                })
                setIsShowModalResult(true);
                if (res.DT && res.DT.quizData) {
                    let dataQuizClone = _.cloneDeep(dataQuiz);
                    let a = res.DT.quizData;
                    for (let q of a) {
                        for (let i = 0; i < dataQuizClone.length; i++) {
                            if (+q.questionId === +dataQuizClone[i].questionId) {
                                //update answer
                                let newAnswers = [];
                                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                    let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                    if (s) {
                                        dataQuizClone[i].answers[j].isCorrect = true;
                                    }
                                    newAnswers.push(dataQuizClone[i].answers[j]);
                                }
                                dataQuizClone[i].answers = newAnswers;
                            }
                        }
                    }
                    setDataQuiz(dataQuizClone);
                }
            } else {
                alert('somthing wrongs....')
            }
        }
    }

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }

    // console.log("Check setDataQuiz:", dataQuiz)
    return (
        <>
            <Breadcrumb className="quiz-detail-new-header">
                <NavLink to="/" className='breadcrumb-item'>Home</NavLink>
                <NavLink to="/users" className='breadcrumb-item'>Users</NavLink>
                <Breadcrumb.Item active>
                    Doing Quiz
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="detail-quiz-wrapper">
                    <div className="left-content-container">
                        <div className="tilte">
                            <span>Quiz {quizId}: {location?.state?.quizTitle}</span>
                        </div>
                        <div className="question-answer-container">
                            <Question
                                index={index}
                                handleCheckBox={handleCheckBox}
                                isShowAnswer={isShowAnswer}
                                isSubmitQuiz={isSubmitQuiz}
                                data={
                                    dataQuiz && dataQuiz.length > 0
                                        ?
                                        dataQuiz[index]
                                        : []
                                }
                            />
                        </div>
                        <div className="container-btn">
                            <button className="btn-prev"
                                onClick={() => handlePrevious()}
                            >
                                Prev
                            </button>
                            <button className="btn-next"
                                onClick={() => handleNext()}>
                                Next
                            </button>
                            {!isSubmitQuiz &&
                                <button className="btn-submit"
                                    onClick={() => handleSubmitQuiz()}>
                                    Finish
                                </button>
                            }
                        </div>
                    </div>
                    <div className="right-content-container">
                        <RightContent
                            dataQuiz={dataQuiz}
                            handleSubmitQuiz={handleSubmitQuiz}
                            setIndex={setIndex}
                        />
                    </div>
                    <ModalResult
                        show={isShowModalResult}
                        setShow={setIsShowModalResult}
                        dataModalResult={dataModalResult}
                        handleShowAnswer={handleShowAnswer}
                    />
                </div>
            </div>
        </>
    )
}

export default DetailQuiz;