import _ from "lodash"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import "react-awesome-lightbox/build/style.css";


const Question = (props) => {
    const { data, index, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleChildCheckBox = (event, aId, qId) => {
        // console.log("check:", event.target.checked)
        // console.log("answer id: ", aId , "question id:", qId);
        props.handleCheckBox(aId, qId);
    }
    return (
        <>
            {data.image ?
                <div className="container-img">
                    <img
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/png;base64, ${data.image}`}
                    />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/png;base64, ${data.image}`}
                            title={'Question-image'}
                            onClose={() => setIsPreviewImage(false)}
                        />
                    }
                </div>
                :
                <div className="container-img">
                </div>
            }
            <div className="question-container">
                <span>Question {index + 1}: {data.questionDescription}</span>
            </div>
            <div className="answer-container">
                {data.answers && data.answers.length &&
                    data.answers.map((ans, inx) => {
                        return (
                            <div key={`answer-${inx}`}
                                className="a-child">
                                <div className="form-check">
                                    <input
                                        id={`checkbox-${inx}-${index}`}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={ans.isSelected}
                                        disabled={props.isSubmitQuiz}
                                        onChange={(event) => handleChildCheckBox(event, ans.id, data.questionId)} />
                                    <label className="form-check-label" htmlFor={`checkbox-${inx}-${index}`}>
                                        {ans.description}
                                    </label>
                                    {isShowAnswer === true &&
                                        <>
                                            {ans.isSelected === true && ans.isCorrect === false
                                                && <IoIosClose className='incorrect' />
                                            }

                                            {ans.isCorrect === true
                                                && <IoIosCheckmark className='correct' />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;