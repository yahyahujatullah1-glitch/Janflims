'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); setError('');
    const result = await signIn('credentials', { ...form, redirect: false });
    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'var(--color-bg-base)' }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '40px 36px', boxShadow: 'var(--shadow-modal)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/">
            <span className="font-display" style={{ fontSize: 36, color: 'var(--color-accent)' }}>JAN</span>
            <span className="font-display" style={{ fontSize: 36 }}>FLIMS</span>
          </Link>
          <p style={{ color: 'var(--color-text-2)', fontSize: 14, marginTop: 8 }}>Welcome back</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm(f=>({...f,email:e.target.value}))} placeholder="you@example.com" />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm(f=>({...f,password:e.target.value}))} placeholder="••••••••" />
        </div>
        {error && <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 12 }}>{error}</p>}
        <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} loading={loading} style={{ marginTop: 24 }}>Sign In</Button>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--color-text-2)' }}>
          No account?{' '}
          <Link href="/register" style={{ color: 'var(--color-accent)' }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
