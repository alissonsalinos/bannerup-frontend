import React from 'react'
import { useHistory } from 'react-router-dom';
import 'rbx/index.css';

export default function AuthOptions() {

    const history = useHistory();

    const register =  () => history.push("/register")
    const login =  () => history.push("/login")

    return (
        <div>
            <button onClick={register} className="button is-vcentered is-primary is-outlined">Register</button>
            <button onClick={login} className="button is-vcentered is-primary is-outlined">Log in</button>
        </div>
    )
}
