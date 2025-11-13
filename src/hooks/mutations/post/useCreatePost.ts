import { createPost, createPostWithImages } from '@/apis/post';
import { useMutationCallback } from '@/types/types';
import { useMutation } from '@tanstack/react-query';

export function useCreatePost(callback?: useMutationCallback) {
  return useMutation({
    // mutation 함수가 변경됨.
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: error => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
