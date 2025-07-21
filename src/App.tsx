import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './routes';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { MainLayout } from './components/layout/MainLayout';
import Searchpage from './components/pages/searchpage';
import Toaster from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route path='/test' element={<Searchpage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </MainLayout>
    </Router>
  );
}

export default App;
