import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { postRegister } from "../../service/apiService"
import { toast } from 'react-toastify';
import SigninVideo from "../../assets/videos/video-signin.mp4"
import logo from "../../assets/images/quiz.png"
import "./SignIn.scss"


const SignIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate();

    const handleRegister = async () => {
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

        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login")
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="container-signin">
            <div className="wrapper-signin">
                <div className="left-content-container">
                    <div className="wrapper-left-content">
                        <div className="left-text">
                            <span>Sign up</span>
                            <span>and come on in</span>
                        </div>
                        <div className="container-video-signin">
                            <video className="video-container"
                                src={SigninVideo} muted autoPlay loop >
                            </video>
                        </div>
                    </div>
                    <div className="container-source">
                        <span>
                            &#169; Bruyne Quiz
                        </span>
                    </div>
                </div>
                <div className="right-content-container">
                    <div className="wrapper-form">
                        <div className="header-signin">
                            <div className="direct-btn">
                                <span>Already have an account</span>
                                <button onClick={() => navigate("/login")}>Log in</button>
                            </div>
                        </div>
                        <div className="container-signin-form">
                            <div className="wrapper-signin-form">
                                <div className="logo-quiz">
                                    <img src={logo} />
                                    <span>Bruyne Quiz</span>
                                </div>
                                <div className="form-group">
                                    <div className="input-email">
                                        <input type="email"
                                            placeholder="Email address"
                                            onChange={(event) => setEmail(event.target.value)}
                                            required />
                                    </div>
                                    <div className="input-pwd">
                                        <input type={isShowPassword ? "text" : "password"}
                                            placeholder="Password"
                                            onChange={(event) => setPassword(event.target.value)}
                                            required />
                                        {isShowPassword ?
                                            <span className="icon-eyes"
                                                onClick={() => setIsShowPassword(false)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-closed-icon lucide-eye-closed">
                                                    <path d="m15 18-.722-3.25" />
                                                    <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                                    <path d="m20 15-1.726-2.05" />
                                                    <path d="m4 15 1.726-2.05" />
                                                    <path d="m9 18 .722-3.25" />
                                                </svg>
                                            </span>
                                            :
                                            <span className="icon-eyes"
                                                onClick={() => setIsShowPassword(true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-icon lucide-eye">
                                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            </span>
                                        }
                                    </div>
                                    <div className="input-username">
                                        <input type="text" placeholder="Username"
                                            onChange={(event) => setUsername(event.target.value)} />
                                    </div>
                                </div>
                                <div className="container-btn-submit">
                                    <button onClick={() => handleRegister()}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;