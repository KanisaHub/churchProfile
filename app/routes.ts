import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

const routes: RouteConfig = [
  // Public landing page (no layout)
  index('routes/home.tsx'),
  
  // Public auth routes (no layout)
  ...prefix('auth', [
    route('register', './routes/auth/register.tsx'),
    route('login', './routes/auth/login.tsx'),
  ]),

  // Protected app routes (with MainLayout and sidebar)
  layout('layout/MainLayout.tsx', [
    route('dashboard', './routes/pages/DistrictPage.tsx'),
    route('district/:id', './routes/pages/DistrictPage.tsx'),
    route('members', './routes/pages/DistrictPage.tsx'), // placeholder
    route('settings', './routes/pages/DistrictPage.tsx'), // placeholder
  ]),
];

export default routes;
