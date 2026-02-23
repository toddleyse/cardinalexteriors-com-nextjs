import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/lib/queries';
import PageBuilder from '@/app/components/PageBuilder';

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return pages.map((page) => ({
    slug: page.slug.current === 'home' ? [] : page.slug.current.split('/'),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'home';

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || '',
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || '',
      images: page.seo?.ogImage ? [page.seo.ogImage] : [],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ? resolvedParams.slug.join('/') : 'home';

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) {
    notFound();
  }

  return <PageBuilder blocks={page.pageBuilder || []} />;
}
