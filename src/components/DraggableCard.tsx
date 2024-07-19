import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.$isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? '0px 2px 15px rgba(0,0,0,0.5)' : 'none'};
`;

/**
 * React.memo
 * : 고차컴포넌트 HOC(Higher Order Component)
 * : 변화가 없는 컴포넌트가 부모의 리렌더링에 의해 리렌더링이 되는 것을 방지할 수 있음
 *
 * 특징
 * - props가 변하지 않으면 리렌더링이 발생하지 않는다.
 * - 컴포넌트를 Memoizing해서 성능을 향상시킨다.
 * - 리렌더링을 '방지'하기위해 사용하면 안됨
 * - React.memo로 감싸진 컴포넌트 내부에 state나 Reducer, useContext 훅을 사용하면 state나 context 변경될 시 다시 렌더링된다
 *
 */

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  idx: number;
}

function DraggableCard({ toDoId, toDoText, idx }: IDraggableCard) {
  return (
    <Draggable key={toDoId + ''} draggableId={toDoId + ''} index={idx}>
      {(provided, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
