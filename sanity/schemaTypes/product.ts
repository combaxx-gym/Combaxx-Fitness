import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU / Model Number',
      type: 'string',
      description: 'Unique product identifier, e.g. CE-2024-001',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'model3D',
      title: '3D Model (GLB / GLTF)',
      type: 'file',
      options: { accept: '.glb,.gltf' },
      description: 'Upload a GLB or GLTF file to enable interactive 3D view',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Key Features (Short List)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-point features shown in the hero section (max 6)',
    }),
    defineField({
      name: 'productFeatures',
      title: 'Product Features (Detailed)',
      type: 'array',
      description: 'Detailed feature cards shown in their own section',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Choose: zap, shield, settings, activity, award, truck, tool, star',
              options: {
                list: ['zap', 'shield', 'settings', 'activity', 'award', 'truck', 'tool', 'star', 'check-circle', 'layers'],
              },
            },
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'featuresImage',
      title: 'Key Features Visual Image (PNG)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a large PNG image showing product features with callouts (for the second section)',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications (Categorized)',
      type: 'array',
      description: 'Group specs by category (e.g., Dimensions, Performance, Electrical)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category Name', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'items',
              title: 'Spec Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'key', title: 'Spec Name', type: 'string' },
                    { name: 'value', title: 'Spec Value', type: 'string' },
                  ],
                  preview: { select: { title: 'key', subtitle: 'value' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'category' } },
        },
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications (Legacy Flat List)',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Key', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'addons',
      title: 'Add-ons / Accessories',
      type: 'array',
      description: 'Complementary products or optional accessories',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          ],
          preview: { select: { title: 'name', media: 'image' } },
        },
      ],
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      description: 'Brochures, manuals, datasheets, CAD files',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'File Name / Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'file', title: 'File', type: 'file' },
            {
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: {
                list: ['Brochure', 'Manual', 'Datasheet', 'CAD File', 'Certificate', 'Installation Guide', 'Other'],
              },
            },
          ],
          preview: { select: { title: 'name', subtitle: 'fileType' } },
        },
      ],
    }),
    defineField({
      name: 'installation',
      title: 'Installation Information',
      type: 'text',
      description: 'Details about installation requirements, space needed, professional setup, etc.',
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty Information',
      type: 'text',
      description: 'Warranty terms, coverage period, what is included, claim process',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference',
      to: [{ type: 'subCategory' }],
      options: {
        filter: () => ({ filter: '_type == "subCategory"' }),
      },
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      hidden: true,
    }),
    defineField({
      name: 'specsPdf',
      title: 'Specifications PDF (Legacy)',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Legacy single-PDF upload. Use Downloads section for multiple files.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({
      name: 'additionalSections',
      title: 'Additional Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'content', title: 'Section Content', type: 'text' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
})
