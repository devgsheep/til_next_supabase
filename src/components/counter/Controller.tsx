'use client';

import { useDecrement, useIncrement } from '@/stores/count';
import { Button } from '../ui/button';

const Controller = () => {
  // Selector 함수 이용
  const increment = useIncrement();
  const decrement = useDecrement();
  return (
    <div className='flex p-6 gap-2'>
      <Button onClick={increment}>증가</Button>
      <Button onClick={decrement}>감소</Button>
    </div>
  );
};

export default Controller;
