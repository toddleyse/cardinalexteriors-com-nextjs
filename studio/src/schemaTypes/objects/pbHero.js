import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Darken the background image (0 = none, 1 = fully dark)',
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'reference',
      to: [{ type: 'page' }],
    }),
    defineField({
      name: 'ctaExternalLink',
      title: 'CTA External Link',
      type: 'url',
      description: 'Use this instead of internal link for external URLs',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'url',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Fallback background color if no image is set',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Override text color (e.g., #ffffff for white text on dark backgrounds)',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero',
        subtitle: 'Hero Block',
        media,
      };
    },
  },
});
