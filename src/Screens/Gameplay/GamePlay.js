import React, { Component } from 'react'
import { Panel, Button, Notification, Icon } from 'rsuite';
import { Field, Form } from 'react-final-form';
import { ButtonAnswer } from '../Utils/FinalFormComponents';
import Countdown from 'react-countdown-now';
import * as api from '../Utils/Api';

const Completionist = () => <span>You Ranout of time bro!</span>;

export default class GamePlay extends Component {
    constructor(){
        super();
        this.state={
            select: false,
            data: null,
            trial: 3,
            date: Date.now() + 30000
        }
        this.user = null;
        this.onSelect = this.onSelect.bind(this);
    }
    async componentDidMount(){
        this.user = JSON.parse(localStorage.getItem("user"));
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
            this.setState({date: Date.now() + 30000})
            setTimeout(async () => {
                const newData = await api.postURL('/get-question', this.user);
                this.setState({ data: newData.data[0] });
            }, 3000);
        }
        else{
            Notification.warning({
                title: "Your answer is incorrect! Please try again",
            });
            this.setState(prevState => ({
                trial: prevState.trial - 1
            }));
        }
    }

    onHandleFormSubmit = (form) => {
        form.submit();
    }
    render() {
        if(!this.state.data){
            return <div className="text-center font-weight-bold"><h1>Loading...</h1></div>
        }
        const {data} = this.state;
        if(this.state.trial === 0){
            return <div className="text-center font-weight-bold"><h1>Game over!</h1></div>
        }
        return (
                <Form onSubmit={this.onSubmit}>
                    {({ handleSubmit, reset, values, form }) => {
                        return (
                            <form onSubmit={async event => {
                                handleSubmit(event).then(reset);                            
                                }}>
                                    <div className="col-6 offset-3">
                                        <Panel className="text-center bg-white" header={<h3>Question: {data.QuestionID}</h3>} bordered>
                                        <h3 className="text-center font-weight-bold">You are playing as{this.user.name.split("@").shift()}. You have {this.state.trial} trials left!</h3>
                                            <div className="d-flex align-items-center">
                                                Time left:
                                                <Countdown date={this.state.date}>
                                                    <Completionist />
                                                </Countdown>
                                            </div>
                                            <div className="mt-2 text-uppercase font-weight-bold">
                                                {data.Question}
                                            </div>
                                        </Panel>
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
        )
    }
}
