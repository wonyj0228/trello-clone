import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

/**
 * DroppableState -> snapshot
 *
 * isDraggingOver : boolean
 * : draggable이 선택한 Droppable위에 드래깅되고(ing) 있는지 여부 확인
 *
 * draggingOverWith: ?DraggableId
 * : Droppable위로 드래그하고있는 DraggableId
 *
 * draggingFromThisWith: ?DraggableId
 * : 현재 droppable에서 벗어나 드래깅되고 있는 DraggableId
 */

const Wrapper = styled.div`
  width: 200px;
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
    props.$isDraggingOver
      ? '#dfe6e9'
      : props.$draggingFromThisWith
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface INewToDo {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  // useRef의 type은 ref.current에 들어갈 값을 설정. null로 설정했다가 html요소를 연결짓기도 가능함.
  const setNewToDo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<INewToDo>();

  const onValid = ({ toDo }: INewToDo) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setNewToDo((allToDo) => {
      const boardToDo = [...allToDo[boardId], newToDo];
      return { ...allToDo, [boardId]: boardToDo };
    });

    setValue('toDo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add Task On ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            $isDraggingOver={snapshot.isDraggingOver} // droppable위에 draggable이 들어와있는지
            $draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} // draggable이 droppable을 벗어나있는지
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, idx) => (
              <DraggableCard
                key={toDo.id}
                idx={idx}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
