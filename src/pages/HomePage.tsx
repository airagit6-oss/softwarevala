import { useState } from 'react';
import { Navbar } from '@/components/marketplace/Navbar';
import { MarketplaceSidebar } from '@/components/marketplace/MarketplaceSidebar';
import { HeroBanner } from '@/components/marketplace/HeroBanner';
import { ProductRow } from '@/components/marketplace/ProductRow';
import { LiveChatWidget } from '@/components/marketplace/LiveChatWidget';
import {
  QuickActionCards, LiveStats, IndustryGrid, AIZone, FinalCTA,
} from '@/components/marketplace/HomeSections';
import { products, sections } from '@/lib/marketplaceData';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const featured = sections.find(s => s.title === 'Trending Now');
  const trending = sections.find(s => s.title === 'Most Used Apps');
  const newReleases = sections.find(s => s.title === 'New Releases');
  const topSelling = sections.find(s => s.title === 'Education Software');
  const remaining = sections.filter(
    s => !['Trending Now', 'Most Used Apps', 'New Releases', 'Education Software'].includes(s.title),
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <MarketplaceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:pl-56' : 'lg:pl-16'}`}>
        <div className="mx-auto max-w-[1600px]">
          {/* S01 Hero */}
          <HeroBanner />

          {/* S02 Quick Action Cards */}
          <QuickActionCards />

          {/* S03 Live Ecosystem Stats */}
          <LiveStats />

          {/* S04 Featured Software (Netflix row) */}
          {featured && <ProductRow title="Featured Software" products={products.filter(featured.filter).slice(0, 12)} />}

          {/* S05 Industry Marketplace */}
          <IndustryGrid />

          {/* S06 Trending Software */}
          {trending && <ProductRow title="Trending Software" products={products.filter(trending.filter)} />}

          {/* S07 Top Selling */}
          {topSelling && <ProductRow title="Top Selling Software" products={products.filter(topSelling.filter)} />}

          {/* S08 New Releases */}
          {newReleases && <ProductRow title="New Releases" products={products.filter(newReleases.filter)} />}

          {/* S09 AI Software Zone */}
          <AIZone />

          {/* Remaining curated industry rows (S11+ vendor markets) */}
          {remaining.map(section => {
            const filtered = products.filter(section.filter);
            return <ProductRow key={section.title} title={section.title} products={filtered} />;
          })}

          {/* S20 Final CTA */}
          <FinalCTA />
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="mx-auto max-w-[1600px] px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <h4 className="mb-3 font-display text-sm font-bold text-foreground">Marketplace</h4>
                <div className="space-y-2">
                  {['Browse Apps', 'Industries', 'AI Zone', 'Enterprise'].map(l => (
                    <p key={l} className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-display text-sm font-bold text-foreground">Partners</h4>
                <div className="space-y-2">
                  {['Resellers', 'Vendors', 'Franchise', 'Authors'].map(l => (
                    <p key={l} className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-display text-sm font-bold text-foreground">Company</h4>
                <div className="space-y-2">
                  {['About', 'Careers', 'Academy', 'Contact'].map(l => (
                    <p key={l} className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">{l}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 font-display text-sm font-bold text-foreground">Legal</h4>
                <div className="space-y-2">
                  {['Privacy', 'Terms', 'Security', 'Compliance'].map(l => (
                    <p key={l} className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">{l}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-6 text-center">
              <p className="text-xs text-muted-foreground">© 2026 Software Vala. All rights reserved. Ultra Premium Enterprise Marketplace.</p>
            </div>
          </div>
        </footer>
      </div>
      <LiveChatWidget />
    </div>
  );
};

export default HomePage;
