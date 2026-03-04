import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex color code (e.g., #007DC3)',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
      description: 'Hex color code (e.g., #00703C)',
    }),
    defineField({
      name: 'headerBackgroundColor',
      title: 'Header Background Color',
      type: 'string',
      description: 'Hex color code for the site header/nav background (e.g., #000000)',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager Container ID',
      type: 'string',
      description: 'GTM-XXXXXXX — loads Google Tag Manager on all pages',
      fieldset: 'analytics',
    }),
    defineField({
      name: 'gaId',
      title: 'Google Analytics Measurement ID',
      type: 'string',
      description: 'G-XXXXXXXXXX — not needed if using GTM to load GA4',
      fieldset: 'analytics',
    }),
    defineField({
      name: 'metaPixelId',
      title: 'Meta (Facebook) Pixel ID',
      type: 'string',
      description: 'Numeric Pixel ID for Meta conversion tracking',
      fieldset: 'analytics',
    }),
    defineField({
      name: 'customHeadScripts',
      title: 'Custom Head Scripts',
      type: 'text',
      rows: 8,
      description: 'Additional scripts to inject in the page head (e.g., LinkedIn Insight, Hotjar). Paste the full <script> tags.',
      fieldset: 'analytics',
    }),
  ],
  fieldsets: [
    {
      name: 'analytics',
      title: 'Analytics & Tracking',
      options: { collapsible: true, collapsed: true },
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
