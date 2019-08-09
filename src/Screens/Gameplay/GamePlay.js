import React, { Component } from 'react'
import { Panel, Button, Notification, Icon } from 'rsuite';
import { Field, Form } from 'react-final-form';
import { ButtonAnswer } from '../Utils/FinalFormComponents';
import {Link} from 'react-router-dom';
import * as api from '../Utils/Api';

export default class GamePlay extends Component {
    constructor(){
        super();
        this.state={
            select: false,
            data: null,
            trial: 3,
            win: false
        }
        this.user = null;
        this.onSelect = this.onSelect.bind(this);
    }
    async componentDidMount(){
        this.user = this.props.location.state.user;
        const newData = await api.postURL('/get-question', this.user);
        this.setState({data: newData.data[0]});
    }

    onSelect(e){
        this.setState({ select: e.target.value });
    }
    onSubmit = (values) => {
        this.onSave(values);
    }

    onSave = async (values) => {
        let {data} = this.state;
        values["id"] = this.user.id;
        values["QuestionID"] = data.QuestionID;
        const res = await api.postURL('/answer', values);
        if(res.data === 'Correct!'){
            Notification.success({
                title: 'Your answer is correct!',
            });
            const newData = await api.postURL('/get-question', this.user);
            if(newData.data === "You win!"){
                this.setState({win: true});
            }
            this.setState({ data: newData.data[0] });
        }
        else{
            Notification.warning({
                title: "Your answer is incorrect! Please try again",
            });
            this.setState(prevState => ({
                trial: prevState.trial - 1
            }))
        }
    }

    decreaseTrial(){
        this.setState(prevState => ({
            trial: prevState.trial - 1
        }))
    }

    onHandleFormSubmit = (form) => {
        form.submit();
    }
    render() {
        if(!this.state.data){
            return <div className="text-center font-weight-bold"><h1>Loading...</h1></div>
        }
        if(this.state.trial === 0){
            return <div className="text-center font-weight-bold">
                <h1>Game Over!</h1>
                <Link to="/">Play Again?</Link>
            </div>
        }
        if(this.state.win){
            return <div className="text-center font-weight-bold text-white"><h1>Congratulations, you are Brad's true friend!</h1><Link to="/">Play Again?</Link></div>
        }
        const {data} = this.state;
        return (
            <div> 
                <Form onSubmit={this.onSubmit}>
                    {({ handleSubmit, reset, values, form }) => {
                        return (
                            <form onSubmit={async event => {
                                handleSubmit(event).then(reset);                            
                                }}>
                                <div className="d-flex">
                                    <div className="col-6 offset-3">
                                        <Panel className="text-center bg-white" header={<h3>Question</h3>} bordered>
                                            <h3 className="text-center font-weight-bold">You are playing as {this.user.name.split("@").shift()}. You have {this.state.trial} trials left!</h3>
                                            <div className="mt-2 text-uppercase font-weight-bold">
                                                {data.Question}
                                            </div>
                                        </Panel>
                                    </div>
                                    <div className="col-3">
                                        <ButtonToolbar>
                                            <Button appearance="default" disabled>Default</Button>
                                            <Button appearance="primary" disabled>Primary</Button>
                                        </ButtonToolbar>
                                    </div>
                                </div>
                                    
                                    <div className="mt-5">
                                        <div className="d-flex align-items-center">
                                            <div className="col-6">
                                                <Field className="font-weight-bold" name={`A: ${data.AnswerA}`} defaultValue={`${this.state.select === `A: ${data.AnswerA}`? true : false}`} component={ButtonAnswer} select={this.state.select} onSelect={this.onSelect} />
                                                <Field className="font-weight-bold" name={`C: ${data.AnswerC}`} defaultValue={`${this.state.select === `C: ${data.AnswerC}` ? true : false}`} component={ButtonAnswer} select={this.state.select} onSelect={this.onSelect} />
                                            </div>
                                            <div className="col-6">
                                                <Field className="font-weight-bold" name={`B: ${data.AnswerB}`} defaultValue={`${this.state.select === `B: ${data.AnswerB}` ? true : false}`} component={ButtonAnswer} select={this.state.select} onSelect={this.onSelect} />
                                                <Field className="font-weight-bold" name={`D: ${data.AnswerD}`} defaultValue={`${this.state.select === `D: ${data.AnswerD}` ? true : false}`} component={ButtonAnswer} select={this.state.select} onSelect={this.onSelect} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 offset-3 mt-3">
                                        <Button block color="green" appearance="primary" onClick={(e) => this.onHandleFormSubmit(form)}><Icon icon="send" className="mr-1"/> Submit Answer</Button>
                                    </div>
                            </form>
                        )
                    }
                }
            </Form>
                }
            </div>
                
        )
    }
}
