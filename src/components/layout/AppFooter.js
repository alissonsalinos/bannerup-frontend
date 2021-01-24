import React from 'react'
import 'rbx/index.css'
import {Footer, Content} from 'rbx';

export default function AppFooter(props) {
    return (
        <Footer>
            <Content textAlign="centered">
                <p>
                <strong>rbx</strong> by <a href="https://github.com/dfee" rel="noreferrer" target="_blank">Devin Fee</a>.
                The source code is released under the{' '}
                <a href="https://opensource.org/licenses/mit-license.php" rel="noreferrer" target="_blank">
                    MIT License
                </a>
                . The website content is licensed{' '}
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="noreferrer" target="_blank">
                    CC BY NC SA 4.0
                </a>
                .
                </p>
                <p>
                <strong>Template Author:</strong> <a href="https://github.com/alissonsalinos" rel="noreferrer" target="_blank">{props.author}</a> / <strong>Company:</strong> <a href="https://vidalink.com.br" rel="noreferrer" target="_blank">{props.company}</a>
                .
                </p>
            </Content>
        </Footer>
    )
}
