import type { Route } from './+types/home';
import { Button } from '~/components/ui/button';
import { useNavigate } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Church Profile' },
    { name: 'description', content: 'Welcome to Church Profile!' },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen from-background to-muted flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-3xl">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Church<span className="text-secondary">Profile</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Modern church management made simple. Empower your ministry with
            digital tools designed for growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Button
            onClick={() => navigate('/auth/register')}
            size="lg"
            className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold text-lg px-8 py-6 transition-colors"
          >
            Get Started Free
          </Button>
          <Button
            onClick={() => navigate('/auth/login')}
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-8 py-6 transition-colors"
          >
            Sign In
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Member Management
            </h3>
            <p className="text-muted-foreground">
              Track attendance, engagement, and growth
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-secondary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Event Planning
            </h3>
            <p className="text-muted-foreground">
              Organize services, events, and activities
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Analytics & Insights
            </h3>
            <p className="text-muted-foreground">
              Data-driven decisions for your ministry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
