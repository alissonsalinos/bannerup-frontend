import React from 'react'
import 'rbx/index.css'
import {Breadcrumb } from 'rbx';

export default function BreadCrump(props) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{props.page}</Breadcrumb.Item>
        </Breadcrumb>
    )
}
