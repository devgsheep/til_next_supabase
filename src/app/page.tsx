import ButtonTest from '@/components/ButtonTest';
import Counter from '@/components/Counter';
import SCSSTest from '@/components/SCSSTest';
import UserProfile from '@/components/UserProfile';
import React from 'react';

function page() {
  return (
    <div>
      <ButtonTest />
      <SCSSTest />
      <Counter />
      <br />
      <br />
      <UserProfile />
    </div>
  );
}

export default page;
