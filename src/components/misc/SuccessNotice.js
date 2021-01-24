import React from 'react'
import 'rbx/index.css';
import { Notification, Delete } from 'rbx';
import {useSpring, animated} from 'react-spring'

export default function SuccessNotice(props) {
    const values = useSpring({opacity: 1, zIndex: 4, bottom: 0, position:'fixed', width: '100%', from: {opacity: 0, zIndex: 4, bottom: -100, position:'fixed',width: '100%'}})
    return (
        <animated.div style={values}>
            <Notification color="success" style={notificationCustom} className="has-text-centered" >
                <Delete as="button" onClick={props.clearError} />
                <h1 className="subtitle">{props.message}</h1>
            </Notification>
        </animated.div>    
       
        
    )
}

const notificationCustom = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: '0!important',
    borderRadius: 0,
}
