import React, { Component } from 'react'
import {Button, Icon} from 'rsuite';
import Happy from './Happy.mp3';
import * as Api from '../Utils/Api';
import LoadingBar from '../Utils/LoadingBar';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            play: false,
            user: null,
            playGame: false,
        }
        this.audio = new Audio(Happy);
        this.playGame = this.playGame.bind(this);
        this.loadingBar = React.createRef();
    }

    componentDidMount(){
        this.setState({ user: this.props.location.state.user}) 
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
        this.setState({playGame: true});
        Api.deleteUrl("/truncate");
    }

    render() {
        if(!this.state.user){
            return <div>...Loading user</div>
        }
        else{
            const user = this.state.user;
            console.log(user);
            return (
                <div>
                    {
                        this.state.playGame ? <Redirect to={{
                            pathname: '/game',
                            state: { user: user }
                        }}
                        /> : <React.Fragment>
                                <div className="ml-2">
                                    <Button onClick={this.togglePlay}>{this.state.play ? 'Sound off' : 'Sound On'}</Button>
                                </div>
                                <h1 className="text-center text-light">WELCOME TO BRAD'S QUIZ GAME</h1>
                                <h2 className="text-center text-light">Click the below button to play!</h2>
                                <div className="mx-auto text-center col-5">
                                    <Button size="lg" block color="green" onClick={this.playGame}><Icon icon="play" className="mr-1" />New Game</Button>
                                </div>
                                <LoadingBar ref={this.loadingBar} />
                            </React.Fragment>
                    }
                </div>
            )
        }
    }
}
