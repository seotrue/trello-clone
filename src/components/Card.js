import React, {Component} from 'react';
import "../styles/Card.css";
import { connect } from "react-redux";

class Card extends Component {
    state = {
        hover: false,
        editing:false
    };

    render() {
        const { card } = this.props;
        const { hover, eidting } = this.state;
        if (!eidting) {}
        return (
            <div className={'Card'}>
                {card.text}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
});
export default connect(mapStateToProps)(Card);