import React from 'react'
import 'rbx/index.css';
import { Progress } from 'rbx';

export default function Loading() {
    return (
        <div style={values}>
            <Progress color='primary' style={valuesProgressBar} />
        </div>
    )
}

const values = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    background: 'rgba(250,250,250,.7)',
    zIndex: 1,
    top: 0
}

const valuesProgressBar = {
    top: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
    position: 'absolute',
    width: '30%',
    left: '50%',
}
