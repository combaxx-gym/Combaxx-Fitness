'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool, StructureBuilder} from 'sanity/structure'
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'

// Define custom structure
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('All Products')
        .schemaType('product')
        .child(S.documentTypeList('product').title('All Products'),
      ),
      S.divider(),
      S.listItem()
        .title('Products by Category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .child((categoryId) =>
              S.documentList()
                .title('Products')
                .schemaType('product')
                .filter('_type == "product" && $categoryId in categories[]._ref')
                .params({ categoryId })
            ),
        ),
      S.divider(),
      // Add other document types
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('subCategory').title('Sub Categories'),
      S.documentTypeListItem('inquiry').title('Inquiries'),
    ]);

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
