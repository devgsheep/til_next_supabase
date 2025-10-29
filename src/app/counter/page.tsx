import Controller from '@/components/counter/Controller';
import Viewer from '@/components/counter/Viewer';

function CounterPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Counter</h1>
      <div className='flex flex-col justify-center items-center'>
        <Viewer />
        <Controller />
      </div>
    </div>
  );
}

export default CounterPage;
