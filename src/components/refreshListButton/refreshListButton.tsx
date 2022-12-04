import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';

const RefreshListButton: React.FC = () => {
  const [needRefreshAtom, setNeedsRefreshAtom] = useAtom(needsRefreshAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [isOnline] = useAtom(isOnlineAtom);

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      type="button"
      onClick={() => {
        setIsLoading(true);
        setNeedsRefreshAtom(needRefreshAtom + 1);
      }}
      disabled={!isOnline}
      data-testid="refreshListButton"
    >
      <svg className="w-7" viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </button>
  );
};

export default memo(RefreshListButton);
