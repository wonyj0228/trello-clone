import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

/**
 *  React-beautiful-dnd
 * : React로 drag n drop 리스트를 만들수 있게 도와주는 package
 *
 *
 * DragDropContext
 * : 드래그 앤 드롭을 가능하게 만드는 영역을 감싸주는 컨테이너.
 * : 필수 props = onDragEnd
 *
 * onDragEnd
 * : Drag가 끝났을 때 실행되는 func
 * : drag한 요소가 무엇인지, destination이 어디인지 (idx, droppableId).. 등등 args로 넘겨주며 알려줌
 *
 *
 * Droppable
 * : 유저가 어떤 요소를 drop할 수 있는 영역
 * : 필수 props = droppableId (drop 영역의 Id)
 * : 자식요소가 반드시 있어야 한다.
 *
 * Droppable child
 * <Droppable droppableId="id">{(provided)=><></>} </Droppable>
 * : 자식요소는 함수형식으로 배치
 *
 * Droppable 함수의 parameter(provided)
 * : innerRef(필수) = beautiful-dnd가 React dom을 활용할 수 있게 함.
 * : droppableProps(필수) = beautiful-dnd의 droppable로써 사용될 수 있게 스타일링 과 같은 속성이 포함되어 있다.
 * : placeholder(옵션) = droppable의 사이즈가 draggable이 사라지더라도 변화하지않고 유지된다.
 *
 *
 *
 * Draggable
 * : Droppable 영역 안에서 실제 드래그 하는 영역
 * : 필수 props = draggableId (drag 영역의 Id), index(index순대로 droppable 안에서 정렬됨)
 * : 자식요소 필수
 * : draggable의 key와 draggableId는 같아야 함
 *
 * Draggable child
 * <Draggable draggableId="id" index={0}>{(provided)=><></>}</Draggable>
 *
 * Draggable 함수의 parameter(provided)
 * : innerRef, draggableProps
 * : dragHandleProps = 특정 영역만 드래그가 가능하도록 하고싶을 때 props로 추가
 *
 */

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    // draggableId는 toDo의 key값만 전달해 줌
    const { destination, draggableId, source } = info;

    if (!destination) return; // destination은 null이나 undefined일 수 있음

    if (source.droppableId === destination.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);

        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    } else if (source.droppableId !== destination.droppableId) {
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const destinationBoard = [...allBoard[destination.droppableId]];
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => {
            return (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            );
          })}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
