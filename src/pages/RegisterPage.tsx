import React from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start shortening links and analyzing visitor telemetry"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
