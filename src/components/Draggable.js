
import React from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const todos = [
    { id: "1", title: "공부" },
    { id: "2", title: "헬스" },
    { id: "3", title: "독서" },
    { id: "4", title: "산책" },
    { id: "5", title: "요리" }
];

// https://velog.io/@yjs3819/react-beautiful-dnd 참고
const DraggableWrap = props => {
    const handleChange = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...todos];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        //setTodos(items);
    };
    return (
        <DragDropContext onDragEnd={handleChange}>
            {/*{ droppableId를 설정해줘서 drop할 엘리먼트를 추적가능하게한다  }*/}
            <Droppable droppableId="todos">
                {(provided) =>(
                    <ul className={'todos'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {/*{ Draggable도 Droppable처럼 draggableId로 고유한 id가필요하다 }*/}
                        {todos.map(({id, title}, index) => (
                            <Draggable  key={id} draggableId={id} index={index}>
                                {(provided) => <li
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                >{title}</li>}
                            </Draggable >
                        ))}
                        {provided.placeholder}
                    </ul>
                )}

            </Droppable>
        </DragDropContext>
    );
};

DraggableWrap.propTypes = {

};

export default DraggableWrap;