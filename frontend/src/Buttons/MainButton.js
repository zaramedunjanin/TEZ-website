import React from 'react';

import '../../../../../Projekat/frontend/src/components/Buttons/MainButton.scss';

const MainButton = (props) => {
    return (
        <a href={props.link}>
            <button type={props.type} className="main-button background-orange">{props.text}</button>
        </a>
    )
}

export default MainButton