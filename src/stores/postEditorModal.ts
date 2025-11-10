import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

const initialState = {
  isOpen: false,
};

// 단게가 중요함.
// 미들웨어와 겹침을 주의하자.
const usePostEditorStore = create(
  devtools(
    combine(initialState, set => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: 'PostEditorStore' }
  )
);

// 오로지 store의 actions의 open만 가져감
export const useOpenPostEditorModal = () => {
  const open = usePostEditorStore(store => store.actions.open);
  return open;
};

// 오로지 store의 actions의 close만 가져감
export const useClosePostEditorModal = () => {
  const close = usePostEditorStore(store => store.actions.close);
  return close;
};

// 미리 store 전체 내보내기
export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorStore();
  return { isOpen, open, close };
};
