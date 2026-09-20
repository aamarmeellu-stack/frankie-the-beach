import React, { useState, useEffect, memo, useMemo } from 'react';
import { useImages } from '../context/ImageContext';
import { resolveImageOverride } from '../utils/slotMapping';
import { isMockupUrl } from '../utils/imageDb';
import { APPLE_MANGO_SLUSHY_DATA_URI } from '../assets/appleMangoSlushyBase64';
import { Utensils, UtensilsCrossed, Coffee, Sparkles } from 'lucide-react';

interface ClientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  slotKey?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ClientImage: React.FC<ClientImageProps> = memo(({
  src,
  slotKey,
  fallbackSrc,
  alt,
  className = '',
  loading,
  decoding = 'async',
  priority = false,
  ...props
}) => {
  let overrideSrc: string | undefined;
  try {
    const { slotOverrides } = useImages();
    if (slotKey) {
      overrideSrc = resolveImageOverride(slotKey, slotOverrides);
    }
  } catch {
    // If used outside ImageProvider, continue gracefully
  }

  // Build resilient ordered candidate URLs
  const candidates = useMemo(() => {
    const list: string[] = [];
    const add = (url?: string) => {
      if (!url || typeof url !== 'string') return;
      const trimmed = url.trim();
      if (!trimmed || isMockupUrl(trimmed)) return;

      // If it's a PNG or JPG/JPEG, prioritize the ultra-fast WebP counterpart first!
      if (/\.(png|jpe?g)$/i.test(trimmed) && !trimmed.startsWith('data:')) {
        const webpCandidate = trimmed.replace(/\.(png|jpe?g)$/i, '.webp');
        if (!list.includes(webpCandidate)) {
          list.push(webpCandidate);
        }
      }

      if (!list.includes(trimmed)) {
        list.push(trimmed);
      }

      // If it's a WebP, ensure JPG and PNG versions are available as fallbacks
      if (trimmed.toLowerCase().endsWith('.webp') && !trimmed.startsWith('data:')) {
        const jpgCandidate = trimmed.replace(/\.webp$/i, '.jpg');
        if (!list.includes(jpgCandidate)) {
          list.push(jpgCandidate);
        }
        const pngCandidate = trimmed.replace(/\.webp$/i, '.png');
        if (!list.includes(pngCandidate)) {
          list.push(pngCandidate);
        }
      }

      // Safe URL variant replacing ampersand (&) with 'and'
      if (trimmed.includes('&') || trimmed.includes('%26')) {
        const andVariant = trimmed.replace(/%26/g, 'and').replace(/&/g, 'and');
        if (!list.includes(andVariant)) {
          list.push(andVariant);
        }
      }

      // Safe URL variant replacing spaces with hyphens or encoded
      if (trimmed.includes(' ')) {
        const encoded = encodeURI(trimmed);
        if (!list.includes(encoded)) {
          list.push(encoded);
        }
      }
    };

    // 1. Stored user override (if active & valid)
    if (overrideSrc) add(overrideSrc);
    // 2. Primary source
    if (src) add(src);
    // 3. Fallback source
    if (fallbackSrc) add(fallbackSrc);

    // Special auto-resilience for Apple & Mango slushy
    const lowerIdentifier = `${alt || ''} ${slotKey || ''} ${src || ''}`.toLowerCase();
    if (lowerIdentifier.includes('apple') && lowerIdentifier.includes('mango')) {
      if (!list.includes(APPLE_MANGO_SLUSHY_DATA_URI)) {
        list.unshift(APPLE_MANGO_SLUSHY_DATA_URI);
      }
      const appleMangoFallbacks = [
        '/dishes/Apple and Mango Slushy 568ml.webp',
        '/dishes/Apple & mango Slushy.webp',
        '/dishes/Apple and Mango Slushy.webp',
        '/dishes/Apple & mango Slushy 568ml.webp',
        '/Apple and Mango Slushy 568ml.webp',
        '/Apple & mango Slushy.webp',
        '/dishes/apple-and-mango-slushy.webp',
      ];
      appleMangoFallbacks.forEach((path) => {
        if (!list.includes(path)) list.push(path);
      });
    }

    return list;
  }, [overrideSrc, src, fallbackSrc, alt, slotKey]);

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setCandidateIndex(0);
    setHasFailed(false);
    setIsLoaded(false);
  }, [candidates]);

  const currentSrc = candidates[candidateIndex];

  const handleError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasFailed(true);
    }
  };

  const handleRef = (node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) {
      setIsLoaded(true);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  // If no valid source or all candidate images failed, render clean placeholder
  if (!currentSrc || hasFailed) {
    const lower = `${alt} ${slotKey || ''}`.toLowerCase();
    const isDrink = lower.includes('drink') || lower.includes('coffee') || lower.includes('slushy') || lower.includes('latte');
    const isBeach = lower.includes('kiosk') || lower.includes('beach') || lower.includes('terrace') || lower.includes('carousel') || lower.includes('ride');

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0070E0]/15 via-[#0048B8]/10 to-[#002B75]/20 text-[#0070E0] p-3 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center mb-1.5 shrink-0 border border-[#0070E0]/20">
          {isDrink ? (
            <Coffee className="w-5 h-5 text-[#0070E0]" />
          ) : isBeach ? (
            <UtensilsCrossed className="w-5 h-5 text-[#0070E0]" />
          ) : (
            <Utensils className="w-5 h-5 text-[#0070E0]" />
          )}
        </div>
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#000000] line-clamp-1">
          {alt || "Frankie's Beach"}
        </span>
        <span className="text-[9.5px] text-[#526b74] font-medium mt-0.5 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#D1A03F]" />
          <span>Awaiting Real Photo</span>
        </span>
      </div>
    );
  }

  const effectiveLoading = priority ? 'eager' : (loading || 'lazy');
  const effectiveDecoding = priority ? 'sync' : decoding;

  return (
    <img
      ref={handleRef}
      src={currentSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        ...props.style,
      }}
      onLoad={handleLoad}
      onError={handleError}
      loading={effectiveLoading}
      decoding={effectiveDecoding}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      {...props}
    />
  );
});

ClientImage.displayName = 'ClientImage';

// Lightweight preloader utility with idle scheduling
const preloadedUrls = new Set<string>();
export const preloadImage = (url: string) => {
  if (!url || preloadedUrls.has(url) || typeof window === 'undefined') return;
  preloadedUrls.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
};

export const preloadImages = (urls: string[]) => {
  if (typeof window === 'undefined') return;
  const runner = () => {
    urls.forEach((u) => {
      if (!u) return;
      if (/\.(png|jpe?g)$/i.test(u)) {
        preloadImage(u.replace(/\.(png|jpe?g)$/i, '.webp'));
      }
      preloadImage(u);
    });
  };

  if (typeof (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback === 'function') {
    (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(runner, { timeout: 2000 });
  } else {
    setTimeout(runner, 150);
  }
};



