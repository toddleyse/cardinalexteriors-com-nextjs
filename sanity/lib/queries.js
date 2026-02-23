import { defineQuery } from 'next-sanity';

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    },
    pageBuilder[]{
      ...,
      _type == "pbHero" => {
        ...,
        "ctaLink": ctaLink->slug.current
      },
      _type == "pbButtons" => {
        ...,
        buttons[]{
          ...,
          link {
            ...,
            internal->{
              _id,
              _type,
              slug,
              title
            }
          }
        }
      },
      _type == "pbCallToAction" => {
        ...,
        "ctaLink": ctaLink->slug.current
      },
      _type == "pbCardGrid" => {
        ...,
        cards[]{
          ...,
          "linkUrl": link->slug.current
        }
      },
      _type == "pbColumns" => {
        ...,
        columns[]{
          ...,
          blocks[]{
            ...
          }
        }
      },
      _type == "pbMediaText" => {
        ...,
        "ctaLink": ctaLink->slug.current
      }
    }
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0]{
    headerLinks[]{
      ...,
      link {
        ...,
        internal->{
          _id,
          _type,
          slug,
          title
        }
      },
      children[]{
        ...,
        link {
          ...,
          internal->{
            _id,
            _type,
            slug,
            title
          }
        }
      }
    },
    footerLinks[]{
      ...,
      link {
        ...,
        internal->{
          _id,
          _type,
          slug,
          title
        }
      },
      children[]{
        ...,
        link {
          ...,
          internal->{
            _id,
            _type,
            slug,
            title
          }
        }
      }
    },
    ctaButton {
      label,
      link {
        ...,
        internal->{
          _id,
          _type,
          slug,
          title
        }
      }
    },
    phone,
    socialLinks[]{
      platform,
      url
    }
  }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    siteTitle,
    siteDescription,
    logo,
    primaryColor,
    secondaryColor,
    address,
    contactEmail,
    contactPhone,
    gtmId,
    gaId,
    metaPixelId,
    customHeadScripts
  }
`);

export const PAGES_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    slug
  }
`);
