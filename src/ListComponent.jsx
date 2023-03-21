import React from 'react';

// imports related to DND 
import { Droppable, Draggable } from 'react-beautiful-dnd';


export function ListComponents({ Marvel, DC }) {


    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "drakgray" : "transparent",
        width: '40%',
        margin: 'auto',
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",

        // change background colour if dragging
        background: isDragging ? "darkgrey" : "white",
        color: isDragging ? "white" : "black",
        padding: isDragging ? '0%' : '2%',
        paddingLeft: '2%',
        margin: '0%',
        fontSize: '17px',
        borderBottom: '0.5px solid gray',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    return (
        <div style={{ width: '100%', display: 'flex' }}>
            {/* assign first droppable element */}
            <Droppable droppableId="Marvel_drop_area"  >
                {/* provided enables functions and properties of Draggable component */}
                {/* snapshot give info about current state, such as wether it is being drgged */}
                {(provided, snapshot) => (
                    <div
                        //pass event handlers provided by component to the DOM
                        //ie: onDragLeave, onDrop, onDragEnter, onDragOver
                        {...provided.droppableProps}
                        // tracks Dimensions and position of component
                        ref={provided.innerRef}
                        //pass snaphot.isDraggingOver to check if component is being dragged
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                            <h6 style={{ paddingLeft: '2%' }}>Marvel SuperHeroes</h6>
                            {/* Loop through array pass through props */}
                            {Marvel.map((data, index) => (
                                // map through components and make each one draggable.
                                <Draggable key={data} draggableId={`${data}${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            key={index}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {data}
                                        </li>
                                    )}

                                </Draggable>
                            ))}
                        </ul>
                        {/* {provided.placeholder} */}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="DC_drop_area"  >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        <ul style={{ listStyleType: 'none', textAlign: 'left', padding: '0%', width: '100%' }} >
                            <h6 style={{ paddingLeft: '2%' }}>DC SuperHeroes</h6>
                            {DC.map((data, index) => (
                                <Draggable key={data} draggableId={`${data}${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            key={index}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {data}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                        </ul>
                        {/* {provided.placeholder} */}
                    </div>
                )}
            </Droppable>
        </div>
    )

}