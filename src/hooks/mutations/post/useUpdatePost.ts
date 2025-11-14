import { useMutation } from '@tanstack/react-query';
import { updatePost } from '@/apis/post';
import { useMutationCallback } from '@/types/types';

export function useUpdatePost(callback?: useMutationCallback) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: error => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
