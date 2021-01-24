import React, { useState, useEffect } from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'rbx/index.css';
import Axios from 'axios'
import Home from './components/pages/Home'
import Edit from './components/pages/Edit'
import Create from './components/pages/Create'
import NotActive from './components/pages/NotActive'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserContext from './context/UserContext'
import './App.css'

export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    })

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token')
            if (token === null) {
                localStorage.setItem('auth-token', '')
                token = ""
            }
            const tokenRes = await Axios.post(`${process.env.REACT_APP_API_URL}/users/tokenIsValid`, null, {
                headers: { 'x-auth-token': token}
            })
            if (tokenRes.data) {
                const userRes = await Axios.get(`${process.env.REACT_APP_API_URL}/users/`, {
                    headers: {"x-auth-token": token},
                })
                setUserData({
                    token,
                    user: userRes.data,
                })
            }
        }

        checkLoggedIn()
    }, [])

    return (
       <>
       <BrowserRouter>
       <UserContext.Provider value={{ userData, setUserData }}>
       <Switch>
           <Route exact path="/" component={Home} />
           <Route path="/login" component={Login} />
           <Route path="/register" component={Register} />
           <Route path="/edit" component={Edit} />
           <Route path="/create" component={Create} />
           <Route path="/notactive" component={NotActive} />
       </Switch>
       </UserContext.Provider>
       </BrowserRouter>
       </>
    )
}