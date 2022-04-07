import { SetState } from 'zustand';
import { AppState } from '../Store/UseStore';
import { getAuthor } from '../Utilities';

export interface IGlobalSlice {
  author: string;
  isFetching: boolean;
}

const globalSlice = (set: SetState<AppState>) => ({
  author: getAuthor(),
  isFetching: false,
});

export default globalSlice;
