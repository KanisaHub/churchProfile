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
  // Public auth routes (no protection)
  ...prefix('auth', [
    route('register', './routes/auth/register.tsx'),
    route('login', './routes/auth/login.tsx'),
  ]),

  // Protected app routes (with MainLayout and sidebar)
  layout('layout/MainLayout.tsx', [
    route('dashboard', './routes/pages/dashboard.tsx'),
    route('district', './routes/pages/DistrictPage.tsx'),
  ]),
];

export default routes;
