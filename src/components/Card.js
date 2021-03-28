import React, {Component} from 'react';
import "../styles/Card.css";
import { connect } from "react-redux";
import CardEditor from "./CardEditor";
import { Droppable, Draggable } from "react-beautiful-dnd";

class Card extends Component {
    state = {
        hover: false,
        editing:false
    };

    startHover = () => this.setState({ hover: true });
    endHover = () => this.setState({ hover: false });

    // 무슨 역활을 하는지
    startEditing = () => {
        this.setState({
            hover: false,
            editing: true,
            text: this.props.card.text
        })
    };

    endEditing = () => this.setState({ hover: false, editing: false });
    editCard = async text => {
        const { card, dispatch } = this.props;

        this.endEditing();
        dispatch({
            type:"CHANGE_CARD_TEXT",
            payload:{ cardId: card._id, cardText: text}
        })
    };

    deleteCard = async () => {
        const { listId, card, dispatch } = this.props;

        dispatch({
            type:'DELETE_CARD',
            payload: { cardId: card._id, listId }
        });
    };

    render() {
        const { card, index } = this.props; // 스토어에서 갖고 옴
        const { hover, editing } = this.state;

        console.log(card,'card')
        if (!editing) {
            return(
                <Draggable draggableId={card._id} index={index}>
                    {(provided, snapshot) => (
                        <div className='Card'
                             ref={provided.innerRef}
                             {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             onMouseEnter={this.startHover}
                             onMouseLeave={this.endHover}
                             >
                            { hover &&
                            <div className="Card-Icons">
                                <div className="Card-Icon" onClick={this.startEditing}>
                                    <ion-icon name="create" />
                                </div>
                            </div>
                            }
                            { card.text }
                        </div>
                    )}
                </Draggable>
            )
        } else {
            // 수정 중일때
            return (
                <CardEditor
                    text={card.text}
                    onSave={this.editCard}
                    onCancel={this.endEditing}
                    onDelete={this.deleteCard}
                />
            );
        }

    }
}

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
});
export default connect(mapStateToProps)(Card);