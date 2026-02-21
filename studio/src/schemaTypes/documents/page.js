import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'pbHero' },
        { type: 'pbHeading' },
        { type: 'pbParagraph' },
        { type: 'pbImage' },
        { type: 'pbColumns' },
        { type: 'pbMediaText' },
        { type: 'pbCardGrid' },
        { type: 'pbFAQ' },
        { type: 'pbButtons' },
        { type: 'pbCallToAction' },
        { type: 'pbTestimonials' },
        { type: 'pbGallery' },
        { type: 'pbSeparator' },
        { type: 'pbSpacer' },
        { type: 'pbForm' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug === 'home' ? '/' : `/${slug}`,
      };
    },
  },
});
