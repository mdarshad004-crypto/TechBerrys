import { BarChart3, Code2, CreditCard, Puzzle, Settings2, ShoppingBag, Truck } from 'lucide-react';
import './ShopifyEcosystemVisual.css';

const ecosystemCards = [
  { className: 'analytics', label: 'App integrations', Icon: BarChart3 },
  { className: 'automation', label: 'Automation', Icon: Settings2 },
  { className: 'payments', label: 'Payments', Icon: CreditCard },
  { className: 'shipping', label: 'Shipping', Icon: Truck },
];

export default function ShopifyEcosystemVisual({ compact = false }) {
  return (
    <div className={`shopify-ecosystem${compact ? ' shopify-ecosystem--compact' : ''}`} role="img" aria-label="Shopify ecosystem with integrations, automation, payments and shipping">
      <span className="shopify-ecosystem-glow shopify-ecosystem-glow--blue" />
      <span className="shopify-ecosystem-glow shopify-ecosystem-glow--purple" />
      <span className="shopify-ecosystem-particle shopify-ecosystem-particle--one" />
      <span className="shopify-ecosystem-particle shopify-ecosystem-particle--two" />
      <span className="shopify-ecosystem-particle shopify-ecosystem-particle--three" />
      <span className="shopify-ecosystem-particle shopify-ecosystem-particle--four" />
      <span className="shopify-ecosystem-orbit shopify-ecosystem-orbit--outer" />
      <span className="shopify-ecosystem-orbit shopify-ecosystem-orbit--middle" />
      <span className="shopify-ecosystem-orbit shopify-ecosystem-orbit--inner" />

      <span className="shopify-ecosystem-code"><Code2 size={16} /></span>
      <span className="shopify-ecosystem-puzzle"><Puzzle size={17} /></span>

      {ecosystemCards.map(({ className, label, Icon }) => (
        <span className={`shopify-ecosystem-card shopify-ecosystem-card--${className}`} key={label}>
          <Icon size={compact ? 15 : 21} strokeWidth={1.8} />
          <b>{label}</b>
        </span>
      ))}

      <span className="shopify-ecosystem-cube">
        <span className="shopify-ecosystem-cube-top" />
        <span className="shopify-ecosystem-cube-side" />
        <span className="shopify-ecosystem-cube-front">
          <span className="shopify-ecosystem-bag"><ShoppingBag size={compact ? 34 : 51} strokeWidth={1.6} /><i>S</i></span>
          <small>SHOPIFY</small>
        </span>
      </span>
    </div>
  );
}
