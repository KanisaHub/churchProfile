import { useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/register';

import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Register - Church Profile' },
    { name: 'description', content: 'Create your church profile account' },
  ];
}

const SignupForm = () => {
  const [formData, setFormData] = useState({
    churchName: '',
    denomination: '',
    email: '',
    phone: '',
    region: '',
    district: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    language: 'English',
    theme: 'Light',
    timezone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // UI-only validation
    const newErrors: Record<string, string> = {};

    if (!formData.churchName) newErrors.churchName = 'Church name is required';
    if (!formData.denomination)
      newErrors.denomination = 'denomination is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email.includes('@'))
      newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
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
    <div className="bg-background flex items-center justify-center p-4 min-h-screen">
      <Card className="shadow-lg flex flex-col m-auto w-4xl">
        <CardHeader className="space-y-1 bg-primary text-primary-foreground rounded-t-lg p-6">
          <CardTitle className="text-3xl font-bold">
            Create Your Church Profile
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Join the ChurchProfile community and manage your church digitally
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Church Information */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Church Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="churchName">Church Name *</Label>
                  <Input
                    id="churchName"
                    value={formData.churchName}
                    onChange={(e) => handleChange('churchName', e.target.value)}
                    className={
                      errors.churchName
                        ? 'border-destructive'
                        : 'focus:border-primary-foreground'
                    }
                    placeholder="Enter church name"
                  />
                  {errors.churchName && (
                    <p className="text-sm text-destructive">
                      {errors.churchName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="denomination">Denomination</Label>
                  <Input
                    id="denomination"
                    value={formData.denomination}
                    onChange={(e) =>
                      handleChange('denomination', e.target.value)
                    }
                    className={errors.denomination ? 'border-destructive' : ''}
                    placeholder="e.g., Pentecostal, Evagelist"
                  />
                  {errors.denomination && (
                    <p className="text-sm text-destructive">
                      {errors.denomination}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Church Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder="church@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                    placeholder="+255 XXX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                    placeholder="Enter region"
                    className={errors.region ? 'border-destructive' : ''}
                  />
                  {errors.region && (
                    <p className="text-sm text-destructive">{errors.region}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Enter district"
                    className={errors.district ? 'border-destructive' : ''}
                  />
                  {errors.district && (
                    <p className="text-sm text-destructive">
                      {errors.district}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pastor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Lead Pastor
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="first name"
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="last name"
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Security
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                    placeholder="Min. 8 characters"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange('confirmPassword', e.target.value)
                    }
                    className={
                      errors.confirmPassword ? 'border-destructive' : ''
                    }
                    placeholder="Re-enter password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* TODO: will focus with it leter */}
            {/* Preferences */}
            {/* <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Preferences
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => handleChange('language', value)}
                  >
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Swahili">Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 ">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={formData.theme}
                    onValueChange={(value) => handleChange('theme', value)}
                  >
                    <SelectTrigger id="theme" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => handleChange('timezone', value)}
                  >
                    <SelectTrigger
                      id="timezone"
                      className="w-full outline-none"
                    >
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-5">EST (UTC-5)</SelectItem>
                      <SelectItem value="UTC-6">CST (UTC-6)</SelectItem>
                      <SelectItem value="UTC-7">MST (UTC-7)</SelectItem>
                      <SelectItem value="UTC-8">PST (UTC-8)</SelectItem>
                      <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                      <SelectItem value="UTC+3">EAT (UTC+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div> */}

            <Button
              type="submit"
              className="w-full  hover:scale(105) bg-primary text-primary-foreground font-semibold py-6 text-lg transition-colors cursor-pointer"
            >
              Create account
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-accent hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
