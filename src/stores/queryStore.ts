// React Query의 상태를 Zustand에서 관리하기 위한 스토어

import { QueryState } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// // 1. 타입 정의
// interface QueryState {
//   // state
//   selectedUserId: number | null; // 현재 선택된 사용자 ID
//   selectedPostId: number | null; // 현재 선택된 게시글 ID
//   // Action
//   setSelectedUserId: (userId: number | null) => void; // 선택된 사용자 ID 설정
//   setSelectedPostId: (postId: number | null) => void; // 선택된 게시글 ID 설정
// }
// 2. localStorage로 생성
const queryLocalState = create<QueryState>()(
  persist(
    (set, get) => ({
      // 초기 state 설정
      selectedUserId: null, // 처음에 선택된 사용자 ID 없음
      selectedPostId: null, // 처음에 선택된 게시글 ID 없음
      // 초기 Action 기능 설정
      setSelectedUserId: (userId: number | null) => {
        set({ selectedUserId: userId });
      },
      setSelectedPostId: (postId: number | null) => {
        set({ selectedPostId: postId });
      },
    }),
    {
      name: 'query-storage', // localStorage에 저장할 키 이름
      partialize: state => ({
        // localStorage에 보관할 state 지정
        // selectedUserId: state.selectedUserId,
        // selectedPostId: state.selectedPostId,
      }),
    }
  )
);
// 3. 훅 정의
export const useQueryStore = () => {
  const {
    selectedUserId,
    selectedPostId,
    setSelectedUserId,
    setSelectedPostId,
  } = queryLocalState();
  return {
    selectedUserId,
    selectedPostId,
    setSelectedUserId,
    setSelectedPostId,
  };
};
