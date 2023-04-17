import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId: any = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset: any = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineConfig({
  name: 'default',
  title: 'tiktung',

  projectId: projectId,
  dataset: dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
