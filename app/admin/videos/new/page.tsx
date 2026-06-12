import React from 'react';
import { VideoForm } from '@/components/admin/VideoForm';

export default function AdminNewVideoPage() {
  return (
    <div className="anim-fadeIn">
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-display" style={{ fontSize: 42 }}>Add New Video</h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: 13, marginTop: 4 }}>Fill in the details below to add a new video to your library</p>
      </div>
      <VideoForm />
    </div>
  );
}
