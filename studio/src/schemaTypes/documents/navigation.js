import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'headerLinks',
      title: 'Header Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Optional image displayed alongside the nav item',
              options: { hotspot: true },
            }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  title: 'Dropdown Item',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                    }),
                  ],
                  preview: {
                    select: { title: 'label' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          title: 'Footer Column',
          fields: [
            defineField({
              name: 'label',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'children',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'footerLink',
                  title: 'Footer Link',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'link',
                    }),
                  ],
                  preview: {
                    select: { title: 'label' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' };
    },
  },
});
