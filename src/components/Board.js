import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../styles/Board.css';
import List from './List';
import AddList from "./AddList";
import { DragDropContext, Droppable  } from "react-beautiful-dnd";

class Board extends Component {
    state = {
      addingList: false
    };

    // 드롭이 끝나구 목록 순서를 변경하는 액션 디스패치
    handleDragEnd = ({ source, destination, type }) => {
        if (!destination) return;

        const { dispatch } = this.props;
        if (type === 'COLUMN'){
            //변경된 것이 없는 경우 업데이트 방지
            if (source.index !== destination.index){
                dispatch({
                    type:'MOVE_LIST',
                    payload: {
                        oldListIndex: source.index,
                        newListIndex: source.index
                    }
                })
            }
            return;
        }

        // Move card
        if (
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    sourceListId: source.droppableId,
                    destListId: destination.droppableId,
                    oldCardIndex: source.index,
                    newCardIndex: destination.index
                }
            });
        }
    };

    toggleAddingList = () => {
      this.setState({ addingList: !this.state.addingList });
    };
    render() {
        const { board } = this.props;
        const { addingList } = this.state;
        console.log(board);
        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable droppableId="board" direction={'horizontal'} type={'COLUMN'}>
                    {(provided, _snapshot) => (
                        <div className={'Board'} ref={provided.innerRef}>
                        {
                            board.lists.map((list, index) => {
                                return <List listId={list} key={list} index={index} />
                            })
                        }
                            {provided.placeholder}
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
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const mapStateToProps = state => ({
    board: state.board
})
export default connect(mapStateToProps)(Board);