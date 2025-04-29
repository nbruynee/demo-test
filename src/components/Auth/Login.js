import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { postLogin } from "../../service/apiService"
import logo from "../../assets/images/quiz.png"
import loginVideo from "../../assets/videos/video-login.mp4"
import "./Login.scss"
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        // submit APIs
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate("/");
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        // console.log(event.key)
        if (event && event.key === "Enter") {
            handleSubmit();
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
                                            onChange={(event) => setPassword(event.target.value)}
                                            onKeyDown={(event) => handleKeyDown(event)} />
                                    </div>
                                </div>
                                <div className="forget-container">
                                    <span>Forgot password?</span>
                                </div>
                                <div className="container-btn-submit">
                                    <button
                                        onClick={() => handleSubmit()}
                                        disabled={isLoading}>
                                        {isLoading === true && <div className="loading-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-loader-pinwheel-icon lucide-loader-pinwheel">
                                                <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
                                                <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
                                                <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
                                                <circle cx="12" cy="12" r="10" />
                                            </svg>
                                        </div>
                                        }
                                        <span>Log in</span>
                                    </button>
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