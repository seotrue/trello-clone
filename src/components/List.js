import React, {Component} from 'react';
import "../styles/List.css";
import { connect } from "react-redux";
import Card from "./Card";
import CardEditor from "./CardEditor";
import shortid from 'shortid';

class List extends Component {
    state = {
        addingCard: false,
        editingTitle: false,
        title: this.props.list.title
    };
    toggleEditingTitle = () => {
        this.setState({ editingTitle: !this.state.editingTitle });
    };

    handleChangeTitle = e => this.setState({ title: e.target.value });

    editListTitle = async () => {
        const { listId, dispatch } = this.props;
        const { title } = this.state;

        this.toggleEditingTitle();

        dispatch({
            type: "CHANGE_LIST_TITLE",
            payload: { listId, listTitle: title }
        });
    };

    delec

    toggleAddingCard = () => {
        this.setState({addingCard: !this.state.addingCard})
    };

    addCard = async cardText => {
        const { listId, dispatch } = this.props;

        this.toggleAddingCard();

        const cardId = shortid.generate();

        dispatch({
            type: 'ADD_CARD',
            payload: {
                cardText,
                cardId,
                listId
            }
        })
    };

    render() {
        const { list } = this.props;
        const { addingCard } = this.state;

        return (
            <div className={'List'}>
                <div className={'List-Title'} onClick={this.toggleEditingTitle}>
                    {list.title}
                </div>
                {  // [listId]: { _id: listId, title: listTitle, cards: [] }

                    list.cards &&
                        list.cards.map((cardId, index) =>(
                            <Card
                                key={cardId}
                                cardId={cardId}
                                index={index}
                                listId={list._id}
                            />
                        ))
                }

                { addingCard ? (
                    <CardEditor
                        onSave={this.addCard}
                        onCancel={this.toggleAddingCard}
                        adding
                        />
                        ) : (
                            <div className="Toggle-Add-Card" onClick={this.toggleAddingCard}>
                                <ion-icon name="add" /> Add a card
                            </div>
                        )
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    list: state.listsById[ownProps.listId]
})
export default connect(mapStateToProps)(List)