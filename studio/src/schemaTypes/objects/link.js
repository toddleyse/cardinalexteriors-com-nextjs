import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'internal',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => !!parent?.external,
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({ parent }) => !!parent?.internal,
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
