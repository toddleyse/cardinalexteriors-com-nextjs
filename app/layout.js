import '@mantine/core/styles.css';
import { Suspense } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme/theme';
import { SanityLive, sanityFetch } from '@/sanity/lib/live';
import { NAVIGATION_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries';
import AnalyticsScripts from './components/AnalyticsScripts';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

export const metadata = {
  title: 'Relaunch Site',
  description: 'A site built with Relaunch',
};

export default async function RootLayout({ children }) {
  let navigation = null;
  let settings = null;

  try {
    const [{ data: navData }, { data: settingsData }] = await Promise.all([
      sanityFetch({ query: NAVIGATION_QUERY }),
      sanityFetch({ query: SETTINGS_QUERY }),
    ]);
    navigation = navData || null;
    settings = settingsData || null;
  } catch {
    navigation = null;
    settings = null;
  }

  const siteTitle = settings?.siteTitle || metadata.title;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Suspense fallback={null}>
          <AnalyticsScripts />
        </Suspense>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <SiteHeader navigation={navigation} settings={settings} siteTitle={siteTitle} />
          <main>{children}</main>
          <SiteFooter navigation={navigation} settings={settings} siteTitle={siteTitle} />
          <SanityLive />
        </MantineProvider>
      </body>
    </html>
  );
}
