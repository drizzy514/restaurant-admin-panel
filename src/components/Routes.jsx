import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Orders from '../pages/Orders'
import Product from '../pages/Products'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/complex' component={Customers}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/foods' component={Product}/>
        </Switch>
    )
}

export default Routes
