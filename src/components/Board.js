import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../styles/Board.css';
import List from './List';
import AddList from "./AddList";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

class Board extends Component {
    state = {
      addingList: false
    };

    handleDragEnd = ({ source, destination, type }) => {

    };

    toggleAddingList = () => {
      this.setState({ addingList: !this.state.addingList });
    };
    render() {
        const { board } = this.props;
        const { addingList } = this.state;
        console.log(board);
        return (
            <div className={'Board'}>
                {
                    board.lists.map((list, index) => {
                        return <List listId={list} key={list} index={index} />
                    })
                }
                <div className="Add-List">
                    { addingList ?
                        <AddList toggleAddingList={this.toggleAddingList} />
                        :
                        <div onClick={this.toggleAddingList} className="Add-List-Button">
                            <ion-icon name="add" /> Add a list
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    board: state.board
})
export default connect(mapStateToProps)(Board);