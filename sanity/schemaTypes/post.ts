import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post / News Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Tips & Guides', value: 'Tips & Guides' },
          { title: 'Industry Insights', value: 'Industry Insights' },
          { title: 'Product Updates', value: 'Product Updates' },
          { title: 'Events', value: 'Events' },
          { title: 'Company', value: 'Company' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags (comma style — add multiple)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. strength training, gym design, maintenance tips',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post (Hero Card)',
      type: 'boolean',
      initialValue: false,
      description: 'Show this post as the big featured hero card at top of the blog page',
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Combaxx Team',
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role / Title',
      type: 'string',
      initialValue: 'Editorial',
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Author Photo (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      options: { dateFormat: 'MMMM D, YYYY' },
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      initialValue: 5,
      description: 'Shown as "X min read"',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt (for archive cards & SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(260).warning('Keep under ~260 chars for archive cards & meta description'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'Used for archive cards AND the big hero at top of the single post detail page. 1200x630 or larger recommended.',
    }),
    defineField({
      name: 'content',
      title: 'Article Body (Portable Text / Rich Content)',
      type: 'array',
      description: 'Full article content — use rich text editor with headings, paragraphs, images, lists, quotes, etc.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: r => r.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }) },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text (accessibility)', type: 'string' },
            { name: 'caption', title: 'Caption (shown under image)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning('SEO title best ~50-60 chars'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(170).warning('Best ~150-160 chars'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
      author: 'author',
    },
    prepare(selection) {
      const { title, subtitle, media, author } = selection
      return {
        title,
        subtitle: author ? `${subtitle} · ${author}` : subtitle,
        media,
      }
    },
  },
})
