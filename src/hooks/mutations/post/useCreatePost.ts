import { createPost } from '@/apis/post';
import { useMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useCreatePost(callback?: useMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: error => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
