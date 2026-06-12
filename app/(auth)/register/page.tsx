'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!form.name)                          errs.name     = 'Required';
    if (!form.email)                         errs.email    = 'Required';
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (!res.ok) {
        const json = await res.json();
        setErrors({ general: json?.error?.message ?? 'Registration failed' });
        return;
      }
      await signIn('credentials', { email: form.email, password: form.password, redirect: false });
      router.push('/');
    } finally {
      setLoading(false);
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
          <p style={{ color: 'var(--color-text-2)', fontSize: 14, marginTop: 8 }}>Start streaming today</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full Name"  value={form.name}     onChange={(e) => setForm(f=>({...f,name:e.target.value}))}     placeholder="Your name"        error={errors.name} />
          <Input label="Email"      type="email" value={form.email}    onChange={(e) => setForm(f=>({...f,email:e.target.value}))}    placeholder="you@example.com"  error={errors.email} />
          <Input label="Password"   type="password" value={form.password} onChange={(e) => setForm(f=>({...f,password:e.target.value}))} placeholder="Min 8 characters" error={errors.password} />
        </div>
        {errors.general && <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 12 }}>{errors.general}</p>}
        <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} loading={loading} style={{ marginTop: 24 }}>Create Account</Button>
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--color-text-2)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--color-accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
