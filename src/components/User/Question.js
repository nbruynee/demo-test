import _ from "lodash"

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {data.image &&
                <div className="container-img">
                    <img src={`data:image/png;base64, ${data.image}`} />
                </div>
            }
            <div classNName="question-container">
                <span>Question {index + 1}: {data.questionDescription}</span>
            </div>
            <div className="answer-container">
                {data.answers && data.answers.length &&
                    data.answers.map((ans, index) => {
                        return (
                            <div key={`answer-${index}`}
                                className="a-child">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" />
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