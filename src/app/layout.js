import { ReactLenis } from 'lenis/react'
import localFont from 'next/font/local'
import { Lexend, MuseoModerno } from 'next/font/google'
import "./globals.css";
import './lib/gsap/gsap'
import { ThemeProvider } from './lib/ThemeContext';
import Header from './components/header/Header';
import { headers } from 'next/headers';

const lexendGiga = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend-giga',
});

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-museo-moderno',
});

const ttTravels = localFont({
  src: [
    {
      path: '../../public/fonts/TT-Travels-Next/TT Travels Next Light Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TT-Travels-Next/TT Travels Next Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT-Travels-Next/TT Travels Next Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT-Travels-Next/TT Travels Next Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TT-Travels-Next/TT Travels Next XtraBold Italic.ttf',
      weight: '800',
      style: 'italic',
    }
  ],
  variable: '--font-tt-travels'
});

export const metadata = {
  title: "Autoscale Labs",
  description: "Created by Autoscale Labs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${ttTravels.variable} ${lexendGiga.variable} ${museoModerno.variable}`}>
        <ReactLenis root>
          <ThemeProvider>
          <Header />
          {children}
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}