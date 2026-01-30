
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import mfe_registry, { type MfeApp } from '../../mfe-registry';

const mfe_apps = mfe_registry.mfe_apps;

// Map MFE name to lazy-loaded component (must match registry names)
const REMOTE_ROUTES: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  mfe_dashboard: lazy(() => import('mfe_dashboard/Routes')),
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      {mfe_apps.map((app: MfeApp) => {
        const RemoteComponent = REMOTE_ROUTES[app.name];
        if (!RemoteComponent) return null;
        return (
          <Route
            key={app.name}
            path={`${app.route}/*`}
            element={
              <Suspense fallback={<div>Loading {app.title}...</div>}>
                <RemoteComponent />
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
