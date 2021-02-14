import React, {Component} from 'react';
import "../styles/Board.css";
import { connect } from "react-redux";
import List from './List'


class Board extends Component {
    render() {
        const { board } = this.props;
        return (
            <div className='Board'>
                {board.lists.map((id, index)=> {
                    return <List listId={id} key={id} index={index} />
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({ board: state.board })
export default connect(mapStateToProps)(Board);