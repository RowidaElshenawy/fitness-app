import type { IFilterOption } from '../types/exercise';

const DIFFICULTY_LEVELS: IFilterOption[] = [
  { _id: '69d982ed85f6bfa972bf2216', name: 'Beginner' },
  { _id: '69d982ed85f6bfa972bf221e', name: 'Novice' },
  { _id: '69d982ed85f6bfa972bf221c', name: 'Intermediate' },
  { _id: '69d982ed85f6bfa972bf2222', name: 'Advanced' },
  { _id: '69d982ee85f6bfa972bf2228', name: 'Expert' },
  { _id: '69d982ee85f6bfa972bf223a', name: 'Grand Master' },
];

export function useDifficultyLevels() {
  return { data: DIFFICULTY_LEVELS, isPending: false, isError: false };
}
