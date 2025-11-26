import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

const routes: RouteConfig = [
  // Public auth routes (no protection)
  ...prefix('auth', [
    route('register', './routes/auth/register.tsx'),
    route('login', './routes/auth/login.tsx'),
  ]),
  index('routes/home.tsx'),

  //   route('logout', './routes/logout.ts'),
];

export default routes;
