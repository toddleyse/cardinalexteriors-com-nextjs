import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbParagraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const block = (content || []).find((b) => b._type === 'block');
      const text = block
        ? block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
        : 'No content';

      return {
        title: text.length > 60 ? text.substring(0, 60) + '...' : text,
        subtitle: 'Paragraph',
      };
    },
  },
});
