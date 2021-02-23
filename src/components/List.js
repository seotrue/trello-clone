import React, {Component} from 'react';
import "../styles/List.css";
import { connect } from "react-redux";
import Card from "./Card";

class List extends Component {
    render() {
        const { list } = this.props;

        return (
            <div className={'List'}>

                {
                    list.cards &&
                        list.cards.map(() => {
                            return <Card />
                        })
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    lists: state.listsById[ownProps.listId]
})
export default connect(mapStateToProps)(List)