import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines. Recommended: 50-60 characters.',
      validation: (Rule) => Rule.max(70).warning('Meta title should be under 70 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines. Recommended: 150-160 characters.',
      validation: (Rule) =>
        Rule.max(170).warning('Meta description should be under 170 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when sharing on social media. Recommended: 1200x630 pixels.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
