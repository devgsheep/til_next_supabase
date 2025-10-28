'use client';
import { signInWithOAuth } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@/hooks/mutations/useSignIn';
import { useSignInWithKakao } from '@/hooks/mutations/useSignInWithKakao';
import Link from 'next/link';
import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutate: signInPassword,
    isPending: isPendingPassword,
    isError,
  } = useSignIn();

  // 카카오 로그인
  const { mutate: signInWithKakao, isPending: isPendingKakao } =
    useSignInWithKakao();
  const handleSignWithKakao = () => {
    signInWithKakao('kakao');
  };

  // 이메일로 로그인
  const handleSignInWithEmail = () => {
    if (!email.trim()) return;
    if (!password.trim()) return;
    // 이메일을 이용해서 로그인 진행
    signInPassword({ email, password });
  };

  if (isError) return;

  return (
    <div className='flex flex-col gap-8'>
      <div className='text-xl font-bold'>로그인</div>
      <div className='flex flex-col gap-2'>
        <Input
          value={email}
          disabled={isPendingPassword}
          type='email'
          onChange={e => setEmail(e.target.value)}
          className='py-6'
          placeholder='example@example.com'
        />
        <Input
          value={password}
          disabled={isPendingPassword}
          type='password'
          onChange={e => setPassword(e.target.value)}
          className='py-6'
          placeholder='password'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Button
          disabled={isPendingPassword}
          onClick={handleSignInWithEmail}
          className='w-full'
        >
          로그인
        </Button>
        {/* 카카오 소셜 로그인 */}
        <Button
          className='w-full'
          onClick={handleSignWithKakao}
          disabled={isPendingKakao}
        >
          카카오 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link
          href={'/signup'}
          className='text-muted-foreground hover:underline'
        >
          계정의 없으시다면? 회원가입하기
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
