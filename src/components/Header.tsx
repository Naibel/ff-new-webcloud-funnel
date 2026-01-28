import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="ovh-header">
      <div className="ovh-header-container">
        {/* Logo and Brand */}
        <Link to="/" className="ovh-header-logo">
          <div className="ovh-logo-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="white"/>
              <path d="M12 6L16 10H13V16H11V10H8L12 6Z" fill="var(--ods-color-primary-500)"/>
            </svg>
          </div>
          <span className="ovh-logo-text">OVHcloud</span>
        </Link>

        {/* Navigation */}
        <nav className="ovh-header-nav">
          <Link 
            to="/" 
            className={`ovh-header-nav-link ${isHomePage ? 'active' : ''}`}
          >
            Accueil
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="ovh-header-actions">
          <button className="ovh-header-action-btn" aria-label="Rechercher">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="ovh-header-action-btn" aria-label="Mon compte client">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="ml-2 hidden md:inline">Mon compte client</span>
          </button>
        </div>
      </div>
    </header>
  );
}
