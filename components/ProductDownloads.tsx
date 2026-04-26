'use client'

import { motion } from 'framer-motion'
import styles from '@/styles/components/ProductDownloads.module.css'

interface DownloadItem {
  name: string
  file?: { asset?: { url?: string } }
  fileType?: string
}

interface Props {
  downloads?: DownloadItem[]
  specsPdfUrl?: string
}

function FileIcon() {
  return (
    <svg className={styles.fileIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className={styles.downloadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export default function ProductDownloads({ downloads, specsPdfUrl }: Props) {
  const safeDownloads: DownloadItem[] = Array.isArray(downloads) ? downloads : []
  const allDownloads: DownloadItem[] = [
    ...(specsPdfUrl ? [{ name: 'Specifications Sheet', file: { asset: { url: specsPdfUrl } }, fileType: 'Datasheet' }] : []),
    ...safeDownloads,
  ].filter(d => d.file?.asset?.url)

  if (!allDownloads.length) return null

  return (
    <section className={styles.section} aria-labelledby="downloads-heading">
      <div className={styles.header}>
        <span className={styles.badge}>Resources</span>
        <h2 className={styles.title} id="downloads-heading">Downloads</h2>
      </div>

      <div className={styles.list}>
        {allDownloads.map((item, i) => (
          <motion.a
            key={i}
            href={item.file!.asset!.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
            download
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <div className={styles.fileIconWrapper}>
              <FileIcon />
            </div>
            <div className={styles.info}>
              <div className={styles.fileName}>{item.name}</div>
              {item.fileType && <div className={styles.fileType}>{item.fileType}</div>}
            </div>
            <DownloadIcon />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
