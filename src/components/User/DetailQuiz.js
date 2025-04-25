import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";
import _ from "lodash"
import "./DetailQuiz.scss"
import Question from "./Question";

const DetailQuiz = (props) => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

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
                        answers.push(item.answers);
                        // console.log("Check anwers:", item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
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


    const handleSubmitQuiz = () => {
        console.log(">>>Check data before submit:", dataQuiz);
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
        }
    }


    // console.log("Check setDataQuiz:", dataQuiz)

    return (
        <div className="detail-quiz-container">
            <div className="detail-quiz-wrapper">
                <div className="left-content-container">
                    <div className="tilte">
                        <span>Quiz {quizId}: {location?.state?.quizTitle}</span>
                    </div>
                    <div className="question-answer-container">
                        <Question
                            data={dataQuiz && dataQuiz.length > 0 ?
                                dataQuiz[index] : []}
                            index={index}
                            handleCheckBox={handleCheckBox}
                        />
                    </div>
                    <div className="container-btn">
                        <button className="btn-prev"
                            onClick={() => handlePrevious()}
                        >
                            Prev
                        </button>
                        <button className="btn-next"
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                        <button className="btn-submit"
                            onClick={() => handleSubmitQuiz()}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className="right-content-container">
                    asdasdasd
                </div>
            </div>
        </div>
    )
}

export default DetailQuiz;