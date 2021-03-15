import React, {Component} from 'react';
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

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
        const { text } = this.state;
        const { onSave, onCancel, adding, onDelete } = this.props;
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
                <EditButtons
                    handleSave={() => onSave(text)}
                    saveLabel={adding ? 'Add card' : 'Save'}
                    handleDelete={onDelete}
                    handleCancel={onCancel}
                    />
            </div>
        );
    }
}

export default CardEditor;