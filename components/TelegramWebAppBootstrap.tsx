'use client';

import { useEffect } from 'react';

export function TelegramWebAppBootstrap() {
  useEffect(() => {
    const telegram = (window as typeof window & {
      Telegram?: {
        WebApp?: {
          ready?: () => void;
          expand?: () => void;
          setHeaderColor?: (color: string) => void;
          setBackgroundColor?: (color: string) => void;
          setBottomBarColor?: (color: string) => void;
        };
      };
    }).Telegram?.WebApp;

    if (!telegram) return;

    telegram.ready?.();
    telegram.expand?.();
    telegram.setHeaderColor?.('#FFF9F4');
    telegram.setBackgroundColor?.('#FFF9F4');
    telegram.setBottomBarColor?.('#FFF9F4');

    document.documentElement.dataset.telegramMiniApp = 'true';
  }, []);

  return null;
}
