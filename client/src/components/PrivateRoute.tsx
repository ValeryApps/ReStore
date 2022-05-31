import React, { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'
interface Props extends RouteProps {
    component: ComponentType<any>
}
const PrivateRoute = ({ component: Component, ...res }: Props) => {
    return (
        <Route {...res} />
    )
}

export default PrivateRoute