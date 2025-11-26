import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/login';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login - Church Profile' },
    { name: 'description', content: 'Sign in to your ChurchProfile account' },
  ];
}

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // UI-only validation
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.email.includes('@'))
      newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', formData);
      // Success message would go here
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 bg-primary text-primary-foreground rounded-t-lg p-2">
          <CardTitle className="text-3xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 text-center">
            Sign in to your ChurchProfile account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="church@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-accent hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={errors.password ? 'border-destructive' : ''}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hover:scale(105) bg-primary text-primary-foreground  font-semibold py-6 text-lg transition-colors cursor-pointer"
            >
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-accent hover:underline font-medium"
              >
                Create one now
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
