import React from 'react';
import {
  Droppable,
} from 'react-beautiful-dnd';

function List({
  children, title, name,
}) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold mb-2 mx-5">{title}</h2>
      <div className="">
        <Droppable droppableId={name}>
          {(provided) => (
            <div ref={provided.innerRef} className="h-screen">
              <div className="p-5 rounded-md min-h-max mx-2 gap-y-3 flex flex-col h-screen">
                {children}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default List;
