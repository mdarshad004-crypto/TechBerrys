import { Link } from 'react-router-dom';

export default function Brand({ className = '', imageClassName = '', loading = 'eager', onClick }) {
  return (
    <Link to="/" className={`brand ${className}`.trim()} aria-label="TechBerry home" onClick={onClick}>
      <img
        className={`brand-logo ${imageClassName}`.trim()}
        src="/assets/techberry-logo.png"
        alt="TechBerry — Beyond Technology. Into Tomorrow."
        width="2172"
        height="724"
        loading={loading}
        decoding="async"
      />
    </Link>
  );
}
