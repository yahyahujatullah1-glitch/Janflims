'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/store/uiStore';

export function AuthModalGlobal() {
  const { authModal, setAuthModal } = useUIStore();
  const [mode,    setMode]    = useState<'login' | 'register'>(authModal ?? 'login');
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => { if (authModal) setMode(authModal); }, [authModal]);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (mode === 'register' && !form.name)     errs.name     = 'Required';
    if (!form.email)                           errs.email    = 'Required';
    if (!form.password || form.password.length < 8) errs.password = 'Min 8 characters';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      if (mode === 'register') {
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
      }
      const result = await signIn('credentials', {
        email:    form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) {
        setErrors({ general: 'Invalid email or password' });
      } else {
        setAuthModal(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={!!authModal} onClose={() => setAuthModal(null)} maxWidth={420}>
      <div style={{ padding: '36px 32px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span className="font-display" style={{ fontSize: 34, color: 'var(--color-accent)' }}>JAN</span>
          <span className="font-display" style={{ fontSize: 34, color: 'var(--color-text-1)' }}>FLIMS</span>
          <p style={{ fontSize: 13, color: 'var(--color-text-2)', marginTop: 6 }}>
            {mode === 'login' ? 'Welcome back' : 'Start streaming today'}
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: 'var(--color-bg-surface-2)', borderRadius: 'var(--radius-sm)', padding: 4, marginBottom: 24 }}>
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1, padding: '8px', borderRadius: 'var(--radius-sm)',
                background:  mode === m ? 'var(--color-bg-surface)' : 'transparent',
                border:      `1px solid ${mode === m ? 'var(--color-border)' : 'transparent'}`,
                color:       mode === m ? 'var(--color-text-1)' : 'var(--color-text-3)',
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                transition: 'all var(--t-fast)',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Your name"
              error={errors.name}
            />
          )}
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            placeholder="••••••••"
            error={errors.password}
          />
        </div>

        {errors.general && (
          <p style={{ color: 'var(--color-danger)', fontSize: 13, marginTop: 12 }}>{errors.general}</p>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSubmit}
          loading={loading}
          style={{ marginTop: 24 }}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--color-text-3)' }}>
          By continuing you agree to our{' '}
          <span style={{ color: 'var(--color-accent)', cursor: 'pointer' }}>Terms of Service</span>
        </p>
      </div>
    </Modal>
  );
}
