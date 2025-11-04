import { Suspense } from 'react';
import { RegisterForm } from './RegisterForm';

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
