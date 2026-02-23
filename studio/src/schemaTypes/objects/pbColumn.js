import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbColumn',
  title: 'Column',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        { type: 'pbHeading' },
        { type: 'pbParagraph' },
        { type: 'pbImage' },
        { type: 'pbButtons' },
        { type: 'pbSpacer' },
      ],
    }),
  ],
  preview: {
    select: {
      blocks: 'blocks',
    },
    prepare({ blocks }) {
      const count = blocks ? blocks.length : 0;
      return {
        title: `Column (${count} block${count !== 1 ? 's' : ''})`,
      };
    },
  },
});
