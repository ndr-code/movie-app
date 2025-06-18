import { lazy, type ComponentType } from 'react';

interface Router {
  path: string;
  element: ComponentType;
}

export const routes: Router[] = [
  {
    path: '/search',
    element: lazy(() => import('../components/pages/searchpage')),
  },
  {
    path: '/search/*',
    element: lazy(() => import('../components/pages/searchpage')),
  },
  {
    path: '/',
    element: lazy(() => import('../components/pages/homepage')),
  },
  {
    path: '/movie/:id',
    element: lazy(() => import('../components/pages/detailpage')),
  },
  {
    path: '/favorites',
    element: lazy(() => import('../components/pages/favoritepage')),
  },
  {
    path: '*',
    element: lazy(() => import('../components/pages/searchpage')),
  },
];
