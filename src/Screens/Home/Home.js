import React, { Component } from 'react'
import {Button, Icon} from 'rsuite';
import Happy from './Happy.mp3';
import * as Api from '../Utils/Api';
import LoadingBar from '../Utils/LoadingBar';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            play: false,
        }
        this.user = null;
        this.audio = new Audio(Happy);
        this.playGame = this.playGame.bind(this);
        this.loadingBar = React.createRef();
    }

    componentDidMount(){
        this.setState({ user: JSON.parse(localStorage.getItem("user"))}) ;
    }

    togglePlay = () => {
        this.setState(prevState => ({
            play: !prevState.play
        }), () => {
            return this.state.play ? this.audio.play() : this.audio.pause()
        })
    }

    playGame(){
        this.loadingBar.current.show();
        this.loadingBar.current.hide();
        Api.deleteUrl("/truncate");
        this.props.history.push('/game');
    }

    render() {
        if(!this.state.user){
            return <div>...Loading User</div>
        }
        const {user} = this.state;
        return (
            <React.Fragment>
                <div className="ml-2">
                    <Button onClick={this.togglePlay}>{this.state.play ? 'Sound off' : 'Sound On'}</Button>
                </div>
                <h1 className="text-center text-light">WELCOME TO BRAD'S QUIZ GAME, {user.name.split("@").shift()}</h1>
                <h2 className="text-center text-light">Click the below button to play!</h2>
                <div className="mx-auto text-center col-5">
                    <Button size="lg" block color="green" onClick={this.playGame}><Icon icon="play" className="mr-1"/>New Game</Button>
                    <Button size="lg" block color="orange">High Scores</Button>
                </div>
                <LoadingBar ref={this.loadingBar} />
            </React.Fragment>
        )
    }
}
