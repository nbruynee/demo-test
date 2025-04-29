import "./Dashboard.scss"
import { ResponsiveContainer, BarChart, Legend, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { getOverview } from "../../../service/apiService";
import { useEffect, useState } from "react";

const DashBoard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        console.log("check res", res)
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //process chart data
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Answers",
                    "As": As,
                },
            ]
            setDataChart(data)
        }
    }

    console.log(dataOverview)
    return (
        <div className="dashboard-container">
            <div className="title">
                <span>Analytics Dashboard</span>
            </div>
            <div className="content">
                <div className="left-content">
                    <div className="child">
                        <span className="text-1">Total User</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users && dataOverview.users.total ?
                                <>{dataOverview.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Quiz</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Question</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Answers</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className="right-content">
                    <ResponsiveContainer width="95%" height={420}>
                        <BarChart width={650} height={420} data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#d8e2dc" />
                            <Bar dataKey="Qs" fill="#fcd5ce" />
                            <Bar dataKey="As" fill="#ffd7ba" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    )
}

export default DashBoard;