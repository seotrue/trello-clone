import React, {Component} from 'react';
import "../styles/ListEditor.css";
import TextareaAutosize from "react-textarea-autosize";

class ListEditor extends Component {
    ref = React.createRef();


    onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.saveList();
        }
    };

    handleClick = e => {
        const node = this.ref.current;

        if (node.contains(e.target)){
            console.log(e.target,'e.target')
            console.log(node,'node')
            return;
        }

        this.props.onClickOutside();
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }


    render() {
        const { title, handChangeTitle, deleteList } = this.props;
        return (
            <div className={'List-Title-Edit'} ref={this.ref}>
              <TextareaAutosize autoFocus
                 className={'List-Title-Textarea'}
                 placeholder="Enter list title..."
                 value={title}
                onChange={handChangeTitle}
                onKeyDown={this.onEnter}
              />
                {deleteList && <ion-icon name="trash" onClick={deleteList} />}
            </div>
        );
    }
}

export default ListEditor;