// 쿼리키 팩토링 상수
export const QUERY_KEYS = {
  profile: {
    all: ['profile'],
    list: ['proflie', 'list'],
    byId: (userId: string) => ['profile', 'byId', userId],
  },
  // 포스트 useQuery 키 생성 및 관리
  posts: {
    all: ['posts'],
    list: ['posts', 'list'],
    byId: (postId: number) => ['posts', 'byId', postId],
  },
};

export const BUCKET_NAME = 'uploads';
