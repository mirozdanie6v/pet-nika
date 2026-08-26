import type { Metadata, Viewport } from 'next';
import './globals.css';
import './mobile-role.css';
import './warm.css';
export const metadata: Metadata = { title: 'PET NIKA Mini App', description: 'PET NIKA client Mini App and demo admin CRM prototype' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#35535B' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
