import type {Metadata} from 'next';
import './globals.css';
import { CivicProvider } from '@/context/civic-context';
import { AuthProvider } from '@/context/auth-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'SevaConnect - Civic Engagement & Volunteer Portal',
  description: 'Connect with your community, find missions, and build reputation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <CivicProvider>
            {children}
            <Toaster />
          </CivicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}