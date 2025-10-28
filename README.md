# 이메일 회원 로그인 구현

- `/src/app/signin/page.tsx`

## 1. UI 구성

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';

function SignIn() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='text-xl font-bold'>로그인</div>
      <div className='flex flex-col gap-2'>
        <Input
          type='email'
          className='py-6'
          placeholder='example@example.com'
        />
        <Input type='password' className='py-6' placeholder='password' />
      </div>
      <div>
        <Button className='w-full'>로그인</Button>
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
```

## 2. 클라이언트 컴포넌트 State 구성

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 이메일로 로그인
  const handleSignInWithEmail = () => {
    if (!email.trim()) return;
    if (!password.trim()) return;
    // 이메일을 이용해서 로그인 진행
  };
  return (
    <div className='flex flex-col gap-8'>
      <div className='text-xl font-bold'>로그인</div>
      <div className='flex flex-col gap-2'>
        <Input
          value={email}
          type='email'
          onChange={e => setEmail(e.target.value)}
          className='py-6'
          placeholder='example@example.com'
        />
        <Input
          value={password}
          type='password'
          onChange={e => setPassword(e.target.value)}
          className='py-6'
          placeholder='password'
        />
      </div>
      <div>
        <Button
          onClick={handleSignInWithEmail}
          className='w-full cursor-pointer'
        >
          로그인
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
```

## 3. api 구성

- `/src/apis/auth.ts` 기능 추가

```ts
// supabase 백엔드에 사용자 이메일 로그인
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}
```

## 4. Mutation 구성

- `/src/hooks/mutations/useSignIn.tsx 파일` 생성

```tsx
import { signInWithPassword } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignIn() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
```

## 5. 적용하기

- `/src/app/signin/page.tsx` 업데이트

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@/hooks/mutations/useSignIn';
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
      <div>
        <Button
          disabled={isPendingPassword}
          onClick={handleSignInWithEmail}
          className='w-full'
        >
          로그인
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
```

# Supabase 카카오 로그인 구현

## 1. 카카오 개발자 앱 등록

- https://developers.kakao.com/

## 2. UI 구성하기

- `/src/app/signin/page.tsx` 추가

```tsx
{
  /* 카카오 소셜 로그인 */
}
<Button className='w-full'>카카오 계정으로 로그인</Button>;
```

## 3. api 구성하기

- `/src/apis/auth.ts` 추가

```ts
import { Provider } from '@supabase/auth-js';

// supabase 백엔드에 소셜 로그인
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider });
  if (error) throw error;
  return data;
}
```

## 4. mutation 구성하기

- `/src/hooks/mutations/useSignInWithKakao.ts` 생성

```ts
import { signInWithOAuth } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export async function useSignInWithKakao() {
  return useMutation({
    mutationFn: signInWithOAuth,
  });
}
```

## 5. 적용하기

- `/src/app/signin/page.tsx` 업데이트

```tsx
// 카카오 로그인
const { mutate: signInWithKakao, isPending: isPendingKakao } =
  useSignInWithKakao();
const handleSignWithKakao = () => {
  signInWithKakao('kakao');
};
```

```tsx
{
  /* 카카오 소셜 로그인 */
}
<Button
  className='w-full'
  onClick={handleSignWithKakao}
  disabled={isPendingKakao}
>
  카카오 계정으로 로그인
</Button>;
```
