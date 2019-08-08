import React, { Component } from 'react'
import {Content, FlexboxGrid, FormGroup, Button, ButtonToolbar, ControlLabel, Panel } from 'rsuite';
import { Field, Form } from 'react-final-form';
import { InputField } from '../Utils/FinalFormComponents';
import LoadingBar from '../Utils/LoadingBar';
import {Redirect} from 'react-router-dom';
import * as Api from '../Utils/Api';
import {
    EmailValid,
    LengthString,
    Required
} from '../Utils/Validation';

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            user: null
        }
        this.loadingBar = React.createRef();
    }
    onSubmit = (values) => {
        this.onSave(values);
    }

    onSave = async (values) => {
        this.loadingBar.current.show();
        const user = await Api.postURL("/register", values);
        this.loadingBar.current.hide();
        this.setState({user: user.data[0]});
    }

    onHandleFormSubmit = (form) => {
        form.submit();
    }
    render() {
        const user = this.state.user;
        return (
            <div>
                {this.state.user ? <Redirect to={{
                    pathname: '/home',
                    state: { user: user }
                }}
                /> : 
                <>
                    <LoadingBar ref={this.loadingBar}></LoadingBar>
                    <Content>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={12}>
                                <Panel className="bg-white" header={<h3>Login to play quiz about Brad :))</h3>} bordered>
                                    <Form fluid onSubmit={this.onSubmit}>
                                        {({ handleSubmit, values, form }) => {
                                            return (
                                                <form onSubmit={handleSubmit}>
                                                    <FormGroup>
                                                        <ControlLabel>Email</ControlLabel>
                                                        <Field
                                                            name="email"
                                                            component={InputField}
                                                            placeholder="Email"
                                                            className="form-control"
                                                            validate={composeValidators(Required, EmailValid)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <ControlLabel>Password</ControlLabel>
                                                        <Field
                                                            name="password"
                                                            type='password'
                                                            component={InputField}
                                                            placeholder="Password"
                                                            className="form-control"
                                                            validate={composeValidators(Required, LengthString)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup className="mt-2">
                                                        <ButtonToolbar>
                                                            <Button color="green" appearance="primary" onClick={(e) => this.onHandleFormSubmit(form)}>
                                                                Login
                                                        </Button>
                                                            <Button color="cyan" appearance="link">Forgot password?</Button>
                                                        </ButtonToolbar>
                                                    </FormGroup>
                                                </form>
                                            )
                                        }
                                        }
                                    </Form>
                                </Panel>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Content>
                </>
                 }
                   
            </div>
        )
    }
}
