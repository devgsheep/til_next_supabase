# Zustand 리뷰

## 1. 리액트 상태(state)에 대한 이해

### 1.1. 컴포넌트 상태 (로컬)

- useState
- State Drilling : 컴포넌트에 props로 state를 전달함. 반복됨

### 1.2. 앱 전역 상태 (글로벌)

- Context API
- Context API를 응용한 라이브러리 : Redux, Recoil, `Zustand`, Mobx, Joitai ...

### 1.3. 네트워크 상태

- 개발자가 직접 관리함 (fetch, axios)
- 라이브러리 React Query

## 2. Zustand

- 레퍼런스 많고, 용량 작고, 배우기 쉽고, 설정도 create로 정리됨
- `npm install zustand`

## 3. 기본 사용법

- `/src/app/counter 폴더` 생성
- `/src/app/counter/page.tsx 파일` 생성

```tsx
function CounterPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Counter</h1>
    </div>
  );
}

export default CounterPage;
```

### 3.1. 전역 stores 생성하기

- `/src/stores 폴더` 생성
- `/src/stores/count.ts 파일` 생성

### 3.2. 단계별 store 생성

- 단계 1.

```ts
import { create } from 'zustand';
create(콜백함수한개);
```

- 단계 2.

```ts
import { create } from 'zustand';
create(() => {});
```

- 단게 3. 객체(store) 한개를 리턴함

```ts
import { create } from 'zustand';
create(() => {
  return 전역변수 store 객체;
});
```

- 단계 4.

```ts
import { create } from 'zustand';
create(() => {
  return {};
});
```

- 단계 5. stroe 객체에는 state와 action 키

```ts
import { create } from 'zustand';
create(() => {
  return {
    state: 초기값,
    action: state 변경하는 함수
  };
});
```

- 단계 6. count 만들고, action 정의하기

```ts
import { create } from 'zustand';
create(() => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 7. create 함수에는 set 매개변수가 있다.
- set은 state 즉, count를 값을 설정하는 기능

```tsx
import { create } from 'zustand';
create(set => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 8. create 함수에는 get 매개변수가 있다.
- get은 state, 즉, count를 값을 읽는 기능

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {},
    decrement: () => {},
  };
});
```

- 단계 9. get 활용하기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // get은 store의 객체를 반환함
      get().count;
    },
    decrement: () => {},
  };
});
```

- 단계 10. set 활용하기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // get은 store의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });
    },
    decrement: () => {},
  };
});
```

- 단계 11. set 사용이 이상함.
- `set({ ...state, count: count + 1 })`
- zustand는 객체 내부의 스테이트의 키명을 기준으로 명시만 하면 됨
- 키명을 명시하고 새로운 값만 작성해주면 됨.
- State 객체를 ... 즉, spred 할 필요없음.

- 단계 12. set을 사용시 함수형태도 지원함.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // get은 store의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });

      // 함수형태 지원
      set(() => {
        return {};
      });
    },
    decrement: () => {},
  };
});
```

- 단계 13. set을 사용시 함수형태도 지원함.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // get은 store의 객체를 반환함
      const count = get().count;
      // set(객체)
      set({ count: count + 1 });

      // 함수형태 지원
      set(store => {
        return { count: store.count };
      });
    },
    decrement: () => {},
  };
});
```

- 단계 14. 보통 get은 사용하지 않는다.

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // 함수형태 지원
      set(store => {
        return { count: store.count };
      });
    },
    decrement: () => {},
  };
});
```

- 단계 15. 화살표 함수 줄이기

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count }));
    },
    decrement: () => {},
  };
});
```

- 단계 16. 추가구현

```ts
import { create } from 'zustand';
create((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

- 단계 17. 타입 추가

```ts
import { create } from 'zustand';

interface CountStoreType {
  count: number;
  increment: () => void;
  decrement: () => void;
}
create<CountStoreType>((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

- 단계 18. create 함수는 커스텀 훅을 즉시 리턴함

```ts
import { create } from 'zustand';

interface CountStoreType {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// 커스텀 훅을 리턴. 아주 좋다.
export const useCountStore = create<CountStoreType>((set, get) => {
  return {
    // state: 초기값
    count: 0,
    // action: state 변경
    increment: () => {
      // 함수형태 지원
      set(store => ({ count: store.count + 1 }));
    },
    decrement: () => {
      set(store => ({ count: store.count - 1 }));
    },
  };
});
```

## 4. 기본 활용하기

- `/src/app/counter/page.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { useCountStore } from '@/stores/count';

function CounterPage() {
  const { count, increment, decrement } = useCountStore();
  return (
    <div>
      <h1 className='text-2xl font-bold'>Counter</h1>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-lg font-bold'>Count: {count}</p>
        <div className='flex p-4 gap-2'>
          <Button onClick={increment}>증가</Button>
          <Button onClick={decrement}>감소</Button>
        </div>
      </div>
    </div>
  );
}

export default CounterPage;
```

## 5. 역할별로 파일 분리하기

### 5.1. 컴포넌트로 분리하기

- `/src/components/counter 폴더` 생성
- `/src\components\counter\Viewer.tsx 파일` 생성

```tsx
'use client';

import { useCountStore } from '@/stores/count';

function Viewer() {
  const { count } = useCountStore();
  return <p className='text-4xl font-bold'>{count}</p>;
}

export default Viewer;
```

- `/src\components\counter\Controller.tsx 파일` 생성

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

function Controller() {
  const { increment, decrement } = useCountStore();
  return (
    <div className='flex p-6 gap-2'>
      <Button onClick={increment}>증가</Button>
      <Button onClick={decrement}>감소</Button>
    </div>
  );
}

export default Controller;
```

### 5.2. page 출력하기

- `/src/app/counter/page.tsx` 업데이트

```tsx
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
```

## 6. 컴포넌트의 리랜더링 상태 파악하기

### 6.1. 웹브라우저의 Devtools를 설치함.

- 설치후 > 웹브라우저 F12 > Components 탭 > Setting(톱니바퀴모양) > Highlight updates when components render 활성
- https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko&pli=1

### 6.2. 왜 불필요한 리랜더링이 일어나는가?

- 버튼은 리랜더링이 필요없는데 일어나는 이유는
- 아래 구문은 count, 즉 state는 없지만 use 훅이 전체 Store를 반환하므로 리랜더링이 일어남

```tsx
const { increment, decrement } = useCountStore();
```

### 6.3. 해당 문제 해결하기(간단함)

- 어떤 값을 가져올지 정확히 명시한 훅을 생성하면 끝.
- 어떤 값을 가져올지 정확히 명시한 훅 함수를 `Selector 함수` 라고 함.

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

const Controller = () => {
  // Selector 함수 이용
  const increment = useCountStore(store => store.increment);
  const decrement = useCountStore(store => store.increment);
  return (
    <div className='flex p-6 gap-2'>
      <Button onClick={increment}>증가</Button>
      <Button onClick={decrement}>감소</Button>
    </div>
  );
};

export default Controller;
```

```tsx
'use client';

import { useCountStore } from '@/stores/count';

const Viewer = () => {
  const count = useCountStore(store => store.count);
  return <p className='text-4xl font-bold'>{count}</p>;
};

export default Viewer;
```

## 7. Store의 구조가 불명확하다

- state와 action의 조합이 store 이다.
- `actions 키`를 명시함

```ts
import { create } from 'zustand';

interface CountStoreType {
  count: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
}

// 커스텀 훅을 리턴. 아주 좋다.
export const useCountStore = create<CountStoreType>((set, get) => {
  return {
    count: 0,
    actions: {
      // action: state 변경
      increment: () => {
        // 함수형태 지원
        set(store => ({ count: store.count + 1 }));
      },
      decrement: () => {
        set(store => ({ count: store.count - 1 }));
      },
    },
  };
});
```

- `\src\components\counter\Controller.tsx`

```tsx
'use client';

import { useCountStore } from '@/stores/count';
import { Button } from '../ui/button';

const Controller = () => {
  // Selector 함수 이용
  const { increment, decrement } = useCountStore(store => store.actions);
  return (
    <div className='flex p-6 gap-2'>
      <Button onClick={increment}>증가</Button>
      <Button onClick={decrement}>감소</Button>
    </div>
  );
};

export default Controller;
```

## 8. store 의 state 또는 action 단어가 바뀌면 모두 뜯어 고쳐야 한다.

- 복잡한 프로젝트는 Select 함수를 컴포넌트에서 직접 불러서 활용하는 경우 드물다.

### 8.1. 전용 커스텀 훅으로 생성 후 활용함. (간단함)

```ts
// 전용 훅들
export const useCount = () => {
  const count = useCountStore(store => store.count);
  return count;
};
export const useIncrement = () => {
  const increment = useCountStore(store => store.actions.increment);
  return increment;
};
export const useDecrement = () => {
  const decrement = useCountStore(store => store.actions.decrement);
  return decrement;
};
```

### 8.2. 컴포넌트에서 활용하기

```tsx
'use client';

import { useCount } from '@/stores/count';

const Viewer = () => {
  const count = useCount();
  return <p className='text-4xl font-bold'>{count}</p>;
};

export default Viewer;
```

```tsx
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
```
