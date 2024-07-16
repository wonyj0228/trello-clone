import React from 'react';
import { useRecoilState } from 'recoil';
import { hourSelector, minuteState } from './atomsBasic';

function AppBasic() {
  const [minutes, setMinutes] = useRecoilState(minuteState); // -> state
  const [hours, setHours] = useRecoilState(hourSelector); // -> selector : [get return 값, set함수]

  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+e.currentTarget.value);
  };
  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    setHours(+e.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default AppBasic;
