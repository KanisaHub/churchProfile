import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Church Profile' },
    { name: 'description', content: 'Welcome to Church Profile!' },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Welcome to church Profile </h1>
    </div>
  );
}
