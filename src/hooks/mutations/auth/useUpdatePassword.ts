import { updatePassword } from '@/apis/auth';
import { useMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useUpdatePassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: error => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
