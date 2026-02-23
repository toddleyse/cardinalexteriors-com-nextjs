import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

/**
 * Build a Sanity image URL from a source reference.
 * Returns a builder (call .url() to get the string), or null if the source
 * is invalid.
 *
 * AI-generated page content sometimes produces malformed references:
 *   - { _sanityAsset: "image@https://gravatar.com/..." }
 *   - { _ref: "image-1280x960-Foo" } (invalid asset ID)
 *   - { asset: "https://example.com/image.png" } (raw URL, not a ref)
 *
 * The @sanity/image-url builder does NOT throw on .image() — it defers
 * validation until .url() is called.  So we eagerly call .url() here to
 * flush out invalid sources, and return null if it fails.  If valid, we
 * return a fresh builder so the caller can still customize (width, height, etc).
 */
export function urlFor(source) {
  if (!source) return null;

  // Reject obvious non-Sanity shapes upfront
  if (source._sanityAsset) return null;
  if (typeof source === 'string' && !source.startsWith('image-')) return null;

  try {
    // Eagerly validate — this throws on invalid refs
    builder.image(source).url();
    // Source is valid; return a fresh builder the caller can customize
    return builder.image(source);
  } catch {
    return null;
  }
}
