import { atom, selector } from 'recoil';

/*
  Selector

  1. Set
  : state의 값을 쓸 수 있게 도와줌. 첫번째 매개변수로 CallbackFunc, 두번째 매개변수로 새로 입력된 값이 전달됨
  : 사용자가 selector를 재설정할 경우 새로 입력 값은 T 타입의 값 또는 DefaultValue 타입의 객체일 수 있다. 

  1** Set CallbackFunc
  : Recoil 상태의 값을 설정할 때 사용. 첫번째 매개변수는 Recoil의 State, 두번째 매개변수는 newValue

  2. Get
  : atom 이나 Selector로 부터 값을 찾는데 사용

*/

export const minuteState = atom({
  key: 'minutes',
  default: 0,
});

export const hourSelector = selector<number>({
  key: 'hours',
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
