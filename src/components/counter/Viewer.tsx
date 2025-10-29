'use client';

import { useCount } from '@/stores/count';

const Viewer = () => {
  const count = useCount();
  return <p className='text-4xl font-bold'>{count}</p>;
};

export default Viewer;
