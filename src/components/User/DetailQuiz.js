import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";
import _ from "lodash"

const DetailQuiz = (props) => {
    const params = useParams();
    // console.log("Chech params:", params)
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
                        answers.push(item.answers);
                        // console.log("Check anwers:", item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log("Check data", data);
        }
    }

    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;