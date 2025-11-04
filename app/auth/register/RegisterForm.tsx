'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export function RegisterForm() {
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get('role') || 'designer';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: roleFromQuery,
    acceptTerms: false,
  });

  useEffect(() => {
    if (roleFromQuery) {
      setFormData(prev => ({ ...prev, role: roleFromQuery }));
    }
  }, [roleFromQuery]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      router.push('/designer/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const roles = [
    { value: 'designer', label: 'Designer' },
    { value: 'client', label: 'Client' },
    { value: 'contractor', label: 'Contractor' },
    { value: 'vendor', label: 'Vendor' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-y-auto">
      {/* Mobile-first header */}
      <div className="bg-surface border-b border-border px-4 py-4 sm:px-6">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link 
            href="/"
            className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-5 h-5 text-foreground-secondary" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">Create Account</h1>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile First */}
      <div className="flex-1 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          {/* Logo and Title - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:block text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center shadow-medium">
                <span className="text-white font-bold text-xl">D2B</span>
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-foreground-secondary">
              Join Design2Build.Pro and start your journey
            </p>
          </div>

          <div className="card-elevated">
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                  I am a
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="Create a password (min. 8 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-border rounded mt-1 flex-shrink-0"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-foreground-secondary">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 text-base font-medium"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-secondary" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-foreground-tertiary">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" className="w-full btn-outline py-2.5 px-4 text-sm">
                  Google
                </button>
                <button type="button" className="w-full btn-outline py-2.5 px-4 text-sm">
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-foreground-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

