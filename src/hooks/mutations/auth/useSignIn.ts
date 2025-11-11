import { signInWithPassword } from '@/apis/auth';
import { useMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useSignIn(callback?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    // 자동으로 error 전달받음
    onError: error => {
      console.error(error);

      if (callback?.onError) callback.onError(error);
    },
  });
}

// if (callback?.onSuccess) callback.onSuccess();
// if (callback?.onMutate) callback.onMutate();
// if (callback?.onSettled) callback.onSettled();
