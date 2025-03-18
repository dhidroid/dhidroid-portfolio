import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { codeInput } from '@sanity/code-input'


export default defineConfig({
  name: 'default',
  title: 'DhiDroid',

  projectId: 'pjmjgioq',
  dataset: 'production',

  plugins: [codeInput(),structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
