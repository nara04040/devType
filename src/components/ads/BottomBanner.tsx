'use client';

import React, { useEffect, useRef } from 'react';
import '@/types/adsense';
import { vscodeDarkTheme } from '@/lib/editor/themes';

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
const ADSENSE_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

export default function BottomBanner() {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  if (!ADSENSE_ID || !ADSENSE_SLOT_ID) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 overflow-hidden"
    style={{ background: vscodeDarkTheme.background }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={ADSENSE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}