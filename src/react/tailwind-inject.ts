// Tailwind CSS auto-injection utility
let tailwindInjected = false;

export function injectTailwindCSS() {
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // Check if Tailwind CSS is already loaded
  if (tailwindInjected || document.querySelector('script[src*="tailwindcss"]')) {
    return;
  }

  try {
    // Create and inject Tailwind CSS CDN script
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    script.onload = () => {
      tailwindInjected = true;
      console.log('✅ Tailwind CSS loaded successfully');
    };
    script.onerror = () => {
      console.warn('⚠️  Failed to load Tailwind CSS from CDN');
    };
    
    document.head.appendChild(script);
  } catch (error) {
    console.warn('⚠️  Could not inject Tailwind CSS:', error);
  }
}

// Auto-inject when module is imported
if (typeof window !== 'undefined') {
  // Use setTimeout to avoid blocking
  setTimeout(injectTailwindCSS, 0);
}
