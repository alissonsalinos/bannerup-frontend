import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
import Loading from "../misc/Loading";
import { useSpring, animated } from 'react-spring'
import './auth.css'

export default function Register() {

    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [loadingBar, setLoadingBar] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const values = useSpring({ opacity: 1, transform: 'scale(1)', from: { opacity: 0, transform: 'scale(0.2)' } })


    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { displayName, email, password, passwordCheck };
            await Axios.post(`${process.env.REACT_APP_API_URL}/users/register`, newUser);

            const loginRes = await Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
                email,
                password,
            })
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })
            setLoadingBar(1)
            setSuccess("Conta criada com sucesso!")
            setTimeout(() => {
                localStorage.setItem("auth-token", loginRes.data.token)
                history.push("/");
            }, 2500);

        } catch (err) {
            setLoadingBar(0)
            err.response.data.msg && setError(err.response.data.msg)
        }


    }

    return (
        <React.Fragment>
            {loadingBar === 1 && (<Loading />)}
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {success && (
                <SuccessNotice message={success} clearError={() => setError(undefined)} />
            )}
            <div className="columns is-vcentered">
                <div className="login column is-4 ">
                    <animated.div style={values}>
                        <section className="section" style={{ marginTop: '0!important' }}>
                            <div className="has-text-centered" style={{ marginBottom: '50px' }}>
                                <div style={{ fontWeight: 'bold', left: '-5%', fontSize: '2.5em', textTransform: 'capitalize', position: 'relative' }}>banner<span className="is-primary" style={{ background: '#00d1b2', fontSize: '.5em', color: 'white', borderRadius: 5 + 'px', padding: '1px 6px', marginTop: '0px', marginLeft: '4px', fontWeight: 'bold', position: 'absolute' }}>UP</span></div>
                            </div>

                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-right">
                                    <input className="input" id="register-displayname" type="text" onChange={(e) => setDisplayName(e.target.value)} />
                                    <span className="icon is-small is-right">
                                        <i className="fa fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-right">
                                    <input className="input" type="email" id="register-email" onChange={(e) => setEmail(e.target.value)} />
                                    <span className="icon is-small is-right">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Senha</label>
                                <div className="control has-icons-right">
                                    <input className="input" type="password" id="register-password" onChange={(e) => setPassword(e.target.value)} />
                                    <span className="icon is-small is-right">
                                        <i className="fa fa-key"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Confirmar Senha</label>
                                <div className="control has-icons-right">
                                    <input className="input" type="password" id="register-password-check" onChange={(e) => setPasswordCheck(e.target.value)} />
                                    <span className="icon is-small is-right">
                                        <i className="fa fa-key"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="has-text-centered">
                                <button className="button is-vcentered is-primary is-outlined" onClick={submit}>Criar conta!</button>
                            </div>
                            <div className="has-text-centered">
                                <Link to="/login" className="has-text-primary"> Já tem uma conta? Faça o login agora!</Link>
                            </div>
                        </section>
                    </animated.div>
                </div>
                <div id="particles-js" className="interactive-bg column is-8"></div>
            </div>
        </React.Fragment>
    )
}
