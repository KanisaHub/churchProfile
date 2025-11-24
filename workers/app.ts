import { createRequestHandler } from 'react-router';
import ServiceContainer from './service/backendLogic';

interface Env {
  churchprofile_db: D1Database;
  AUTH_SESSION_SECRET: string;
}

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    services: ServiceContainer;
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by react-router at build time
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const services = new ServiceContainer(env.churchprofile_db);
    return requestHandler(request, {
      cloudflare: { env, ctx },
      services,
    });
  },
} satisfies ExportedHandler<Env>;
