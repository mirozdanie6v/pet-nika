import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { TelegramWebAppBootstrap } from '@/components/TelegramWebAppBootstrap';
import './globals.css';
import './mobile-role.css';
import './warm.css';
import './premium.css';

export const metadata: Metadata = {
  title: 'PET NIKA Mini App',
  description: 'PET NIKA client Mini App and demo admin CRM prototype',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFF9F4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js?63" strategy="beforeInteractive" />
      </head>
      <body>
        <Script
          src="https://dashboard.viiversion.com/tracker.js"
          strategy="afterInteractive"
          data-project="PET NIKA"
          data-endpoint="https://dashboard.viiversion.com/api/collect"
        />
        <TelegramWebAppBootstrap />
        {children}
      </body>
    </html>
  );
}
