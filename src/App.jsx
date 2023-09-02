import React, {Fragment} from 'react';
import {useRoutes} from "react-router-dom";

import {route} from './routes'

function App(props) {

    const element = useRoutes(route)

    return (
        <Fragment>
            {element}
        </Fragment>
    );
}

export default App;