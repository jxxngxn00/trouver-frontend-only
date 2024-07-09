import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TouchDnd({ List, setList }) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(List);
    const [reorderedItem] = items.splice(result.source.index, 1);

    // Check if the item is dragged to the last position
    if (result.destination.index === items.length) {
      // Do not add the item back to the list
      setList(items);
    } else {
      // Add the item back to the new position in the list
      items.splice(result.destination.index, 0, reorderedItem);
      setList(items);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable-1" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {List.map((item, idx) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={idx}>
                {(provided) => (
                  <RouteDiv
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="default"
                  >
                    <div className='route'>
                      <span className='placeName'>{item.placeName}</span>
                      <div className='detailsWrapper'>
                        <span className='placeCate'>{item.placeCate}</span>
                        {item.placeRate ? (
                          <span className='placeRate'>
                            <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}}/>
                            {item.placeRate}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <FontAwesomeIcon className='gripLines' icon={faGripLines} id="drag"/>
                  </RouteDiv>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const RouteDiv = styled.div`
  border-radius: 10px;
  box-shadow: 0px 4px 18px -5px hsla(234, 44%, 26%, 0.411);
  width: 95%;
  padding: 0.5% 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  & .detailsWrapper {
    gap: 0vw!important;
    justify-content: flex-start;
  }
  & .gripLines {
    margin-right: 4.5%;
  }
`;
