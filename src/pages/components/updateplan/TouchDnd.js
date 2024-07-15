import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TouchDnd({ List, setList }) {
  const [ isDeleteMode, setIsDeleteMode ] = useState(false);
  const [ selectedItems, setSelectedItems ] = useState([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination || isDeleteMode) return;

    const items = Array.from(List);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedItems([]);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelectItems) => 
      prevSelectItems.includes(itemId)
      ? prevSelectItems.filter((id)=> id !== itemId)
      : [...prevSelectItems, itemId] 
    );
  };

  const handleDeleteSelected = () => {
    setList(List.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <>
      <DeleteModeWrapper>
        <span className='date'>9월 7일 목요일</span>
        <button onClick={() => toggleDeleteMode()}>
          {isDeleteMode ? '취소' : <DeleteOutlined /> }
        </button>
        {isDeleteMode && (
        <>
          <button onClick={() => handleDeleteSelected()} disabled={selectedItems.length === 0}>
            선택된 경유지 삭제 
          </button>
        </>
      )}
      </DeleteModeWrapper>
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
                      {isDeleteMode && (
                        <>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)} />
                          </>
                      )}
                      <div className={isDeleteMode ? 'route deleteMode' : 'route'}>
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
                        {!isDeleteMode && (
                          <div className='comment'>
                            <input type='text' placeholder='테스터님 만의 특별한 팁을 적어주세요!(선택)'/>
                          </div>
                        )}
                      </div>
                      {!isDeleteMode && (
                        <FontAwesomeIcon className='gripLines' icon={faGripLines} id="drag" />
                      )}
                    </RouteDiv>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
const DeleteModeWrapper = styled.div`
  display: flex;  
  justify-content: flex-end;
  align-items: center;
  gap: 2vw;

  & button {
    font-size: 0.75rem;
    white-space: nowrap;

    margin: 0 !important;
    border: 2px solid #ff6e6e;
    color: #ff6e6e;
    background-color: white;
    border-radius: 30px;

    padding: 1vh 1.9vw;
  }
`;

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

  & .deleteMode .detailsWrapper {
    justify-content: flex-end;
  }

  & .comment input {
    width: 67vw;
    height: 5vh;
    /* border: none; */
    border-width: 0 0 1px;
  }
`;
