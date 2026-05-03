// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.cloudpdf.app', lastModified: new Date(), priority: 1 },
    { url: 'https://www.cloudpdf.app/word_to_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/merge_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/compress_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/image_to_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/powerpoint_to_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/protect_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/excel_to_pdf', lastModified: new Date(), priority: 0.9 },
    { url: 'https://www.cloudpdf.app/split_pdf', lastModified: new Date(), priority: 0.9 },
  ]
}