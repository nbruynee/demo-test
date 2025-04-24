import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { postLogin } from "../../service/apiService"
import logo from "../../assets/images/quiz.png"
import loginVideo from "../../assets/videos/video-login.mp4"
import "./Login.scss"
import { useDispatch } from "react-redux";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        // validate
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const isInvalidEmail = validateEmail(email);
        if (!isInvalidEmail) {
            toast.error("Invalid email")
            return;
        }
        if (!password) {
            toast.error("Invalid password")
            return;
        }
        // submit APIs
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch({
                type: 'FETCH_USER_LOGIN_SUCCESS',
                payload: data,
            })
            toast.success(data.EM);
            navigate("/")
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <div className="container-login">
            <div className="wrapper-container">
                <div className="login-header">
                    <div className="wrapper-header">
                        <div className="logo-quiz" onClick={() => navigate("/")}>
                            <img src={logo} />
                            <span>Bruyne Quiz</span>
                        </div>
                        <div className="redirect-btn">
                            <span>Don't have an account yet?</span>
                            <button onClick={() => navigate("/signup")}>Sign up</button>
                        </div>
                    </div>
                </div>
                <div className="container-form-login">
                    <div className="wrapper-form-login">
                        <div className="container-form-group">
                            <div className="wrapper-form-group">
                                <div className="text-intro">
                                    <span>Have a nice day, Who's this?</span>
                                </div>
                                <div className="form-group">
                                    <div className="input-email">
                                        <input type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>
                                    <div className="input-pwd">
                                        <input type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)} />
                                    </div>
                                </div>
                                <div className="forget-container">
                                    <span>Forgot password?</span>
                                </div>
                                <div className="container-btn-submit">
                                    <button
                                        onClick={() => handleSubmit()}>Log in</button>
                                </div>
                                <div className="container-back-homepg">
                                    <span onClick={() => navigate("/")}>
                                        &larr;&nbsp;Go to Home Page
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="container-video">
                            <div className="wrapper-video">
                                <video className="video-container"
                                    src={loginVideo} muted autoPlay loop >
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Login;