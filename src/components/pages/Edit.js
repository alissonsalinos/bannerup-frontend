import React, {useEffect, useContext} from 'react';
import Header from '../layout/Header';
import HeroBanner from '../layout/HeroBanner';
import NewForm from '../layout/NewForm';
import AppFooter from '../layout/AppFooter'
import {useHistory, useLocation} from 'react-router-dom';
import UserContext from "../../context/UserContext";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Edit() {

    let query = useQuery();
    let id = query.get("id");
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) history.push("/login");
        console.log
        (userData.user)
    })

    return (
        <>
        <Header />
        <HeroBanner />
        <NewForm id={id} />
        <AppFooter author="Alisson Dias" company="Vidalink SA" />
        </>
    )
}
