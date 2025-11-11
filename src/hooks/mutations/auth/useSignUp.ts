import { signUpWithEmail } from '@/apis/auth';
import { useMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useSignUp(callback?: useMutationCallback) {
  return useMutation({
    mutationFn: signUpWithEmail,
    onError: error => {
      console.log(error);
      if (callback?.onError) callback.onError(error);
    },
  });
}
