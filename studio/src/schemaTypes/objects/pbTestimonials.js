import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pbTestimonials',
  title: 'Testimonials',
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
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
      },
      initialValue: 2,
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Company',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'avatar',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials }) {
      const count = testimonials ? testimonials.length : 0;
      return {
        title: title || 'Testimonials',
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
