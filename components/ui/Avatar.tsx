import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  name:    string;
  size?:   number;
  src?:    string | null;
}

const COLORS = ['#d4a843','#52c97a','#5b9cf6','#e05252','#b07aff','#f07070','#40c4c4'];

export function Avatar({ name, size = 36, src }: AvatarProps) {
  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div
      style={{
        width:          size,
        height:         size,
        borderRadius:   '50%',
        background:     src ? 'transparent' : color,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontWeight:     700,
        fontSize:       size * 0.38,
        color:          '#0a0a0a',
        overflow:       'hidden',
        flexShrink:     0,
        userSelect:     'none',
      }}
    >
      {src
        ? <Image src={src} alt={name} width={size} height={size} style={{ objectFit: 'cover' }} />
        : initials
      }
    </div>
  );
}
