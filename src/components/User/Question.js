import _ from "lodash"
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";


const Question = (props) => {
    const { data, index } = props;
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
                    data.answers.map((ans, index) => {
                        return (
                            <div key={`answer-${index}`}
                                className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={ans.isSelected}
                                        onClick={(event) => handleChildCheckBox(event, ans.id, data.questionId)} />
                                    <label className="form-check-label">
                                        {ans.description}
                                    </label>
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