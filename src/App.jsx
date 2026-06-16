import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import TrustQuote from './components/TrustQuote.jsx';
import FinalCta from './components/FinalCta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="bg-bg text-ink" style={{ overflowX: 'hidden' }}>
      <Header />
      <main>
        <Hero />
        <Features />
        <TrustQuote />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
