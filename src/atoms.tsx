import { atom, selector } from 'recoil';

// [key:string] : key에는 string값이 들어갈 수 있음을 명시해줌
// 이는 to_do, doing, done이 toDoState의 유일한 key값이 아님을 알려줌
// 확장성과 동시에 외부에서 string으로 value값에 접근할 수 있음

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    'TO DO': [],
    DOING: [],
    DONE: [],
  },
});
