import React, {Component} from 'react';
import TextareaAutosize from "react-textarea-autosize";

class CardEditor extends Component {
    state ={
        text: this.props.text || ''
    };

    handleChangeText = event => {
        const text = event.target.value;
        this.setState({ text: text })
    };

    onEnter = e => {
        const { text } = this.state;

        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onSave(text)
        }
    };

    render() {
        const { text } = this.props;
        const { onSave, onCancel, adding } = this.state;
        return (
            <div className={'Edit-Card'}>
                <div className={'Card'}>
                    <TextareaAutosize
                        autoFocus
                        className='Edit-Card-Textarea'
                        placeholder='Enter the text for this card...'
                        value={text}
                        onChange={this.handleChangeText}
                        onKeyDown={this.onEnter}
                        />
                </div>
            </div>
        );
    }
}

export default CardEditor;