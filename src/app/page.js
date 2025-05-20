import { ReactLenis } from 'lenis/react'
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import ServicesComponent from './components/services/Services';
import { headers } from 'next/headers';

export default function Home() {
  const header = headers();
  const viewport = header.get("x-viewport");
  const isMobile = viewport === "mobile" ? true : false;
  return (
    <main>
      <ServicesComponent isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <div style={{ height: "100vh", background: "crimson" }}></div>
    </main>
  );
}