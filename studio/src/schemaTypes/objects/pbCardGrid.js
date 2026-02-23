import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbCardGrid',
  title: 'Card Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Grid', value: 'standard' },
          { title: 'Coverflow Slider', value: 'coverflow' },
        ],
      },
      initialValue: 'standard',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
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
              name: 'title',
              title: 'Title',
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
              name: 'linkLabel',
              title: 'Link Label',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'reference',
              to: [{ type: 'page' }],
            }),
            defineField({
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
              description: 'Use this instead of internal link for external URLs',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      cards: 'cards',
    },
    prepare({ title, cards }) {
      const count = cards ? cards.length : 0;
      return {
        title: title || 'Card Grid',
        subtitle: `${count} card${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
