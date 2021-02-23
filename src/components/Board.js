import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../styles/Board.css';
import List from './List';

class Board extends Component {
    render() {
        const { board } = this.props;
        console.log(board);
        return (
            <div className={'Board'}>
                {
                    board.lists.map((list, index) => {
                        return <List listId={list} key={list} index={index} />
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    board: state.board
})
export default connect(mapStateToProps)(Board);