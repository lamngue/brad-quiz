import React, { Component, Suspense } from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
export default class DefaultLayout extends Component {
    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );

    render() {
        return (
            <div>
                <Suspense fallback={this.loading()}>
                    <div className="app-body">
                        <main className="main"></main>
                    </div>
                </Suspense>
            </div>
        )
    }
}
