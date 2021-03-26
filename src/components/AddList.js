import "../styles/AddList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";

class AddList extends Component {
    state = {
        title: ''
    };

    createList = async () =>{
        const { title } = this.state;
        const { dispatch } = this.props;

        this.props.toggleAddingList();
        dispatch({
            type:'ADD_LIST',
            payload:{
                listId:shortid.generate(),
                listTitle: title
            }
        })
    };
    handleChangeTitle = e => {
        this.setState({title: e.target.value})
    };

    render() {
        const { toggleAddingList } = this.props;  // boolear
        const { title } = this.state;
        return (
            <div className="Add-List-Editor">
              <ListEditor
                title={title}
                handChangeTitle={this.handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={this.createList}
              />
              <EditButtons
                handleCancel={toggleAddingList}
                saveLabel={'Add List'}
                handleSave={this.createList}
              />
            </div>
        );
    }
}

export default AddList;