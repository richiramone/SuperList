import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './Components/LoginButton';

const AppStyles = styled.div`
  section {
    margin-top: 5rem;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
      env(safe-area-inset-left);
    width: 100vw;
  }
`;

const App: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const setConnectionStatus = useStore(useCallback(state => state.setConnectionStatus, []));
  const renderLoader = () => <></>;
  const Preloader = lazy(() => import('./Components/Preloader'));
  const ConfirmationDialog = lazy(() => import('./Components/ConfirmationDialog'));
  const AddItem = lazy(() => import('./Components/AddItem'));
  const ItemsList = lazy(() => import('./Components/ItemsList'));

  window.addEventListener('online', () => setConnectionStatus(true));
  window.addEventListener('offline', () => setConnectionStatus(false));

  return (
    <Suspense fallback={renderLoader()}>
      <AppStyles>
        <Preloader />
        <ConfirmationDialog />
        <section>
          <Header />
          {!isAuthorLogged ? (
            <LoginButton />
          ) : (
            <main>
              <aside>
                <AddItem />
              </aside>
              <ItemsList />
            </main>
          )}
        </section>
      </AppStyles>
    </Suspense>
  );
};

export default App;
