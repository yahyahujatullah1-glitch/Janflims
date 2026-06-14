import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

const SETTINGS = [
  { label: 'Site Name',       key: 'siteName',       value: 'JanFlims',                         type: 'text'     },
  { label: 'Site URL',        key: 'siteUrl',        value: 'https://janflims.vercel.app',      type: 'url'      },
  { label: 'Admin Email',     key: 'adminEmail',     value: 'admin@janflims.com',               type: 'email'    },
  { label: 'Database URL',    key: 'databaseUrl',    value: 'mysql://•••@host:3306/janflims',   type: 'text'     },
  { label: 'NextAuth Secret', key: 'nextauthSecret', value: '•••••••••••••••••••',              type: 'password' },
  { label: 'Cloudinary URL',  key: 'cloudinaryUrl',  value: 'cloudinary://key:•••@cloud',       type: 'text'     },
];

export default function AdminSettingsPage() {
  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Settings</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>Configure your JanFlims instance</p>
      </div>

      <div style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 28, maxWidth: 640 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-3)', marginBottom: 20 }}>Site Configuration</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {SETTINGS.map((s) => (
            <Input
              key={s.key}
              label={s.label}
              type={s.type as any}
              defaultValue={s.value}
            />
          ))}
        </div>
        <Button variant="primary" icon={<Check size={14} />} onClick={() => alert('Settings are managed via your .env.local file on the server. Redeploy after updating environment variables.')}>Save Settings</Button>
        <p style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 10 }}>⚠️ These values are read-only previews. Edit your .env.local file to change them.</p>
      </div>
    </div>
  );
}
