// 쿼리키 팩토링 상수
export const QUERY_KEYS = {
  profile: {
    all: ['profile'],
    list: ['proflie', 'list'],
    byId: (userId: string) => ['profile', 'byId', userId],
  },
};
