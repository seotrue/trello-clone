import "../styles/App.css";
import Board from './Board'
import React, {Component} from 'react';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <div className='Header'>
                    React Trello Clone
                    <Board />
                </div>
            </div>
        );
    }
}

export default App;