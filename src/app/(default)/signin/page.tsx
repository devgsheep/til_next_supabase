'use client';
import { signInWithOAuth } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@/hooks/mutations/useSignIn';
import { useSignInWithGoogle } from '@/hooks/mutations/useSigninWithGoogle';
import { useSignInWithKakao } from '@/hooks/mutations/useSignInWithKakao';
import { getErrorMessage } from '@/lib/error';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: signInPassword, isPending: isPendingPassword } = useSignIn({
    onError: error => {
      setPassword('');
      // Sonner로 띄우기
      // 한글 메시지로 교체
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-center' });
    },
  });

  // 카카오 로그인
  const { mutate: signInWithKakao, isPending: isPendingKakao } =
    useSignInWithKakao({
      onError: error => {
        setPassword('');
        // Sonner로 띄우기
        // 한글 메시지로 교체
        const message = getErrorMessage(error);
        toast.error(message, { position: 'top-center' });
      },
    });
  const handleSignWithKakao = () => {
    signInWithKakao('kakao');
  };

  // 구글 로그인
  const { mutate: signInWithGoogle, isPending: isPendingGoogle } =
    useSignInWithGoogle({
      onError: error => {
        setPassword('');
        // Sonner로 띄우기
        // 한글 메시지로 교체
        const message = getErrorMessage(error);
        toast.error(message, { position: 'top-center' });
      },
    });
  const handleSignWithGoogle = () => {
    signInWithGoogle('google');
  };

  // 이메일로 로그인
  const handleSignInWithEmail = () => {
    if (!email.trim()) return;
    if (!password.trim()) return;
    // 이메일을 이용해서 로그인 진행
    signInPassword({ email, password });
  };

  // if (isError) return;

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
          className='w-full bg-amber-400'
          onClick={handleSignWithKakao}
          disabled={isPendingKakao}
        >
          카카오 계정으로 로그인
        </Button>
        {/* 구글 소셜 로그인 */}
        <Button
          onClick={handleSignWithGoogle}
          disabled={isPendingGoogle}
          className='w-full bg-blue-100 text-blue-800'
        >
          구글 계정으로 로그인
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        <Link
          className='text-muted-foreground hover:underline'
          href={'/signup'}
        >
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className='text-muted-foreground hover:underline'
          href={'/forget-password'}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
