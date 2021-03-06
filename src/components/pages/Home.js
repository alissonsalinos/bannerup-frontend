import React, {useEffect, useContext} from 'react';
import Header from '../layout/Header';
import HeroBanner from '../layout/HeroBanner';
import HomeList from '../layout/HomeList';
import AppFooter from '../layout/AppFooter'
import {useHistory} from 'react-router-dom';
import UserContext from "../../context/UserContext";

export default function Home() {

    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) history.push("/login");
        console.log(userData.user)
    })

    return (
        <>
        <Header />
        <HeroBanner />
        <HomeList />
        <AppFooter author="Alisson Dias" company="Vidalink SA" />
        </>
    )
}
