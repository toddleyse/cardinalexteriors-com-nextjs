import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbFAQ',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
    },
    prepare({ title, items }) {
      const count = items ? items.length : 0;
      return {
        title: title || 'FAQ',
        subtitle: `${count} question${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
