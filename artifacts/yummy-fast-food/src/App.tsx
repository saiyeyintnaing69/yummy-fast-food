import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  ExternalLink,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Navigation,
  Phone,
  Utensils,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const grabFoodUrl = 'https://r.grab.com/o/0SaUgIMy';
const tikTokUrl = 'https://www.tiktok.com/@yummy.fried.chick?_r=1&_t=ZS-9A7PLIeZ00i';
const mapsUrl = 'https://maps.app.goo.gl/ymFGWhoz6gZKSqWf9?g_st=ic';
const phoneUrl = 'tel:09452978877';
const addressLines = [
  'စစ်ကိုင်း-မန်းလမ်း၊',
  'ဦးပွါးကုန်းကျော် အရှေ့ဖက် အဆင်း၊',
  'COCO Store ၏ မျက်နှာချင်းဆိုင်လမ်းကြား၊',
  '78 လမ်း၊ 104 × 105 ကြား၊',
  'Mandalay City, Myanmar',
];

const wings = [
  { name: 'YummY Original Wings', detail: 'Crispy, straight-up YummY.', tone: 'cream' },
  { name: 'YummY Cola Wings', detail: 'Dark, glossy, and YummY.', tone: 'cola' },
  { name: 'YummY Sweet & Hot Wings', detail: 'Sweet first. Heat follows.', tone: 'red' },
  { name: 'YummY Honey Butter Wings', detail: 'Golden, rich, impossible to ignore.', tone: 'honey' },
  { name: 'YummY Signature Orange Wings', detail: 'Bright citrus with a YummY edge.', tone: 'orange' },
];

function MetaTags() {
  useEffect(() => {
    document.title = 'YummY Fast Food — Wings & Sichuan Mala in Mandalay';
    const description = 'YummY Fast Food in Mandalay serves crispy fried chicken wings and Sichuan Mala skewers with signature seasonings and sauces.';
    const tags = [
      ['name', 'description', description],
      ['property', 'og:title', 'YummY Fast Food — Wings & Sichuan Mala in Mandalay'],
      ['property', 'og:description', description],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', window.location.origin],
      ['property', 'og:image', `${window.location.origin}/yummy-wings-hero.jpg`],
      ['name', 'twitter:card', 'summary_large_image'],
    ];
    tags.forEach(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
  }, []);

  return null;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand-mark ${inverse ? 'brand-mark-inverse' : ''}`} data-testid="brand-mark">
      <span className="brand-mark-y">Y</span>
      <span className="brand-mark-name">ummY</span>
      <span className="brand-mark-dot" />
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#about', label: 'About' },
    { href: '#wings', label: 'Wings' },
    { href: '#visit', label: 'Visit' },
  ];

  return (
    <header className="site-header" data-testid="site-header">
      <div className="site-header-inner">
        <a href="#top" aria-label="YummY Fast Food home" className="brand-link" data-testid="link-home">
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={phoneUrl} data-testid="link-header-phone">
            <Phone size={15} strokeWidth={2.2} />
            <span>09-452978877</span>
          </a>
          <a className="header-order" href={grabFoodUrl} target="_blank" rel="noreferrer" data-testid="link-header-grabfood">
            ORDER ON GRABFOOD
            <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
              <span>{link.label}</span>
              <ArrowDownRight size={18} />
            </a>
          ))}
          <a href={grabFoodUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} data-testid="link-mobile-grabfood">
            <span>ORDER ON GRABFOOD</span>
            <ArrowUpRight size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-copy">
        <div className="eyebrow reveal" data-testid="text-hero-eyebrow">
          <span className="eyebrow-line" />
          Mandalay, Myanmar
        </div>
        <div className="hero-brandline reveal" data-testid="text-hero-brandline">
          <span className="hero-brand-name">YummY Fast Food</span>
          <span className="hero-tagline" data-testid="text-hero-tagline">Chicken Wings &amp; Sichuan Mala Skewers</span>
        </div>
        <h1 className="hero-heading font-display reveal reveal-delay-1" data-testid="text-hero-heading">
          Good food.<br />
          <span>Big mood.</span>
        </h1>
        <div className="hero-actions reveal reveal-delay-3">
          <a className="button button-red" href={grabFoodUrl} target="_blank" rel="noreferrer" data-testid="link-hero-grabfood">
            ORDER ON GRABFOOD
            <ArrowUpRight size={18} />
          </a>
          <a className="button button-quiet" href="#wings" data-testid="link-hero-menu">
            See the wings
            <ChevronDown size={17} />
          </a>
        </div>
        <div className="hero-footnote reveal reveal-delay-3">
          <span className="footnote-mark"><Flame size={13} /></span>
          <span>Signature seasonings. Serious crunch.</span>
        </div>
      </div>
      <div className="hero-visual" data-testid="image-hero-food">
        <img src="/yummy-wings-hero.jpg" alt="Crispy fried chicken wings and Sichuan Mala skewers" />
        <div className="hero-visual-overlay" />
        <div className="hero-vertical-label font-mono-brand">WINGS / MALA / MANDALAY</div>
        <div className="hero-sticker">
          <span>Y</span>
          <small>HOT<br />STUFF</small>
        </div>
        <div className="hero-image-caption">
          <span>01</span>
          <span className="caption-rule" />
          <span>CRISPY / SEASONED / YummY</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section page-shell" data-testid="section-about">
      <div className="section-kicker">
        <span className="font-mono-brand">01 / ABOUT YummY</span>
        <span className="section-rule" />
      </div>
      <div className="about-grid">
        <div className="about-title-wrap">
          <p className="side-note font-mono-brand">NEIGHBORHOOD<br />FOOD, LOUD FLAVOR.</p>
          <h2 className="display-heading font-display" data-testid="text-about-heading">
            Familiar food.<br /><em>Unfamiliar</em><br />energy.
          </h2>
        </div>
        <div className="about-copy">
          <p className="lead-copy" data-testid="text-about-description">
            YummY is a lively neighborhood food spot with its own signature seasonings and sauces.
          </p>
          <p className="body-copy">
            Come for the crispy wings. Stay for the Sichuan Mala skewers. Every bite is direct, satisfying, and memorable — the kind of food that makes the walk home feel worth it.
          </p>
          <a className="text-link" href={tikTokUrl} target="_blank" rel="noreferrer" data-testid="link-about-tiktok">
            <span>Follow the flavor on TikTok</span>
            <ExternalLink size={17} />
          </a>
        </div>
      </div>
      <div className="about-strip">
        <div className="strip-item">
          <Utensils size={19} />
          <span>CRISPY WINGS</span>
        </div>
        <div className="strip-item">
          <Flame size={19} />
          <span>SICHUAN MALA</span>
        </div>
        <div className="strip-item">
          <span className="strip-dot" />
          <span>MANDALAY / MYANMAR</span>
        </div>
      </div>
    </section>
  );
}

function WingsMenu() {
  return (
    <section id="wings" className="wings-section" data-testid="section-wings">
      <div className="page-shell">
        <div className="section-kicker section-kicker-light">
          <span className="font-mono-brand">02 / THE WINGS</span>
          <span className="section-rule" />
          <span className="kicker-note">Pick your mood</span>
        </div>
        <div className="wings-intro">
          <h2 className="display-heading display-heading-light font-display" data-testid="text-wings-heading">
            Five ways<br /><span>to get messy.</span>
          </h2>
          <p className="wings-intro-copy">
            Our wing lineup, each one finished with a YummY point of view.
          </p>
        </div>
        <div className="wings-list" data-testid="list-wings">
          {wings.map((wing, index) => (
            <div className="wing-row" key={wing.name} data-testid={`row-wing-${index + 1}`}>
              <span className={`wing-number font-mono-brand ${wing.tone}`}>0{index + 1}</span>
              <span className={`wing-flavor ${wing.tone}`} aria-hidden="true" />
              <div className="wing-name-wrap">
                <h3>{wing.name}</h3>
                <p>{wing.detail}</p>
              </div>
              <ArrowUpRight className="wing-arrow" size={21} />
            </div>
          ))}
        </div>
        <div className="wings-cta">
          <p>Want the full YummY fix?</p>
          <a className="button button-red" href={grabFoodUrl} target="_blank" rel="noreferrer" data-testid="link-wings-grabfood">
            ORDER ON GRABFOOD
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  return (
    <section id="visit" className="visit-section page-shell" data-testid="section-visit">
      <div className="section-kicker">
        <span className="font-mono-brand">03 / FIND YummY</span>
        <span className="section-rule" />
      </div>
      <div className="visit-grid">
        <div className="visit-heading-wrap">
          <h2 className="display-heading font-display" data-testid="text-visit-heading">
            Come hungry.<br /><span>Leave happy.</span>
          </h2>
          <a className="map-card" href={mapsUrl} target="_blank" rel="noreferrer" data-testid="link-google-maps">
            <div className="map-card-top">
              <span className="map-pin"><MapPin size={18} /></span>
              <span className="font-mono-brand">OPEN IN MAPS</span>
              <ArrowUpRight size={17} />
            </div>
            <div className="map-lines" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="map-card-bottom">
              <span>Get directions</span>
              <Navigation size={16} />
            </div>
          </a>
        </div>
        <div className="visit-details">
          <div className="detail-block">
            <div className="detail-icon"><MapPin size={20} /></div>
            <div>
              <p className="detail-label font-mono-brand">ADDRESS</p>
                <p className="detail-value burmese" data-testid="text-address">
                  {addressLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
            </div>
          </div>
          <div className="detail-block">
            <div className="detail-icon"><Clock3 size={20} /></div>
            <div>
              <p className="detail-label font-mono-brand">OPENING HOURS</p>
              <p className="detail-value" data-testid="text-hours">12:00 PM – 8:00 PM</p>
            </div>
          </div>
          <div className="detail-block">
            <div className="detail-icon"><Phone size={20} /></div>
            <div>
              <p className="detail-label font-mono-brand">CALL YummY</p>
              <a className="detail-value detail-link" href={phoneUrl} data-testid="link-phone">09-452978877 <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="footer-top page-shell">
        <BrandMark inverse />
        <p className="footer-line">Crispy wings. Mala skewers.<br />Mandalay, see you soon.</p>
        <div className="footer-links">
          <a href={tikTokUrl} target="_blank" rel="noreferrer" data-testid="link-footer-tiktok">
            TikTok <ArrowUpRight size={15} />
          </a>
          <a href={grabFoodUrl} target="_blank" rel="noreferrer" data-testid="link-footer-grabfood">
            GrabFood <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <span className="font-mono-brand">YummY FAST FOOD</span>
        <span className="font-mono-brand">MANDALAY / MYANMAR</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="yummy-site grain">
      <MetaTags />
      <Header />
      <main>
        <Hero />
        <About />
        <WingsMenu />
        <VisitSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;