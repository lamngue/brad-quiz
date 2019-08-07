import React, { Component, Suspense } from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import routes from "../routes";
export default class DefaultLayout extends Component {
    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    render() {
        return (
            <div>
                <Suspense fallback={this.loading()}>
                    <div className="app-body">
                        <main className="main">
                            <Container fluid>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => <route.component {...props} />}
                                            />
                                        ) : null;
                                    })}
                                    <Redirect from="/" to="/home" />
                                </Switch>
                            </Container>
                        </main>
                    </div>
                </Suspense>
            </div>
        )
    }
}
