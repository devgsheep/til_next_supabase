import { signInWithPassword } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignIn() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
