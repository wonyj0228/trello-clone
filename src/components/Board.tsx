import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

/**
 * DroppableState -> snapshot
 *
 * isDraggingOver : boolean
 * : draggable이 선택한 Droppable위에 드래깅되고(ing) 있는지 여부 확인
 *
 * draggingOverWith: ?DraggableId
 * : Droppable위로 드래그하고있는 DraggableId
 *
 * draggingFromThisWith:
 */

const Wrapper = styled.div`
  width: 200px;
  padding: 20px 10px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 18p;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? 'pink' : props.draggingFromThisWith ? '' : 'blue'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <DraggableCard key={toDo} idx={idx} toDo={toDo} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
