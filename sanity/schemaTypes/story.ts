import { defineField, defineType } from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Story / Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
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
          { title: 'Athletes', value: 'Athletes' },
          { title: 'Facilities', value: 'Facilities' },
          { title: 'Innovation', value: 'Innovation' },
          { title: 'Lifestyle', value: 'Lifestyle' },
          { title: 'Community', value: 'Community' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Badge (e.g. Case Study)',
      type: 'string',
      initialValue: 'Case Study',
      description: 'The small label shown above the title on cards and in hero (e.g. Case Study, Athlete Profile, Facility Build)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story (Hero Card)',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, this story will appear as the big featured card at the top of the Stories page (only one at a time is ideal)',
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      options: { dateFormat: 'MMMM YYYY' },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt (for archive cards)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220).warning('Keep under ~220 chars for the archive grid'),
    }),
    defineField({
      name: 'intro',
      title: 'Intro / Description (hero area)',
      type: 'text',
      rows: 4,
      description: 'Longer story summary shown under the big title on the detail page hero (1-2 paragraphs)',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used for archive cards AND as the dark background image on the detail page hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client / Brand Logo',
      type: 'image',
      options: { hotspot: true },
      description: 'The brand logo shown in the testimonial section (e.g. Spartan Fitness logo). Transparent PNG recommended.',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats (2–3 cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. 250+)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label (e.g. Active members)', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (Rule) => Rule.min(2).max(3),
      description: 'The floating stat cards overlayed on the detail page hero (2-3 entries is ideal)',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial / Person Section',
      type: 'object',
      fields: [
        { name: 'personName', title: 'Person Name (e.g. Bilal Munir)', type: 'string' },
        { name: 'personTitle', title: 'Person Role / Title (e.g. Founder - Spartan Fitness)', type: 'string' },
        {
          name: 'personPhoto',
          title: 'Person Photo',
          type: 'image',
          options: { hotspot: true },
          description: 'Large portrait photo shown next to the quote (rounded corners card style)',
        },
        { name: 'quote', title: 'Quote / Testimonial Text', type: 'text', rows: 4 },
        {
          name: 'signatureImage',
          title: 'Signature Image (optional)',
          type: 'image',
          options: { hotspot: true },
          description: 'PNG with transparent background for the handwritten signature under the quote',
        },
        {
          name: 'stat',
          title: 'Side Stat Card',
          type: 'object',
          description: 'The small stat card shown to the right of the testimonial (optional)',
          fields: [
            { name: 'value', title: 'Value (e.g. 250+)', type: 'string' },
            { name: 'label', title: 'Label (e.g. Active members)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'showcaseHeading',
      title: 'Showcase Section — Heading',
      type: 'string',
      initialValue: 'Explore the range of products',
    }),
    defineField({
      name: 'showcaseSubheading',
      title: 'Showcase Section — Sub-heading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'productGallery',
      title: 'Product Showcase Gallery (Bento Grid)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
            { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
            { name: 'productName', title: 'Product Name (e.g. Functional GHD Bench)', type: 'string' },
            { name: 'productDescription', title: 'Short Description (shown under name for large featured items only)', type: 'text', rows: 2 },
            {
              name: 'size',
              title: 'Card Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small (square)', value: 'small' },
                  { title: 'Large (wide, 2 cols)', value: 'large' },
                ],
              },
              initialValue: 'small',
            },
          ],
          preview: {
            select: { title: 'productName', subtitle: 'size', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      description: '3-4 items works best with the asymmetric bento layout (1 or 2 Large + rest Small)',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products (links to real product pages)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'OPTIONAL — attach actual product pages so "View Product" buttons work',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
})
