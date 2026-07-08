'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from '@/styles/components/ProductHeroInfo.module.css'
import reviewStyles from '@/styles/components/ProductReviews.module.css'

interface Review {
  _id: string
  name: string
  rating: number
  reviewText: string
  approved: boolean
  submittedAt: string
}

interface Props {
  productId: string
  productName: string
  productSku?: string
  productSlug: string
  categoryName?: string
  description?: string
  features?: string[]
  specsPdfUrl?: string
  reviews: Review[]
}

function MailIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

export default function ProductHeroInfo({
  productId, productName, productSku, productSlug, categoryName, description, features = [], specsPdfUrl, reviews,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0
  
  // Round to 1 decimal place
  const roundedRating = Math.round(averageRating * 10) / 10

  const handleScrollToForm = useCallback(() => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Function to scroll to reviews section
  const handleScrollToReviews = useCallback(() => {
    const reviewsSection = document.querySelector('#reviews-heading')?.closest('section')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setMessageType('')

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          rating,
          reviewText,
          productId,
          productName,
        }),
      })

      const data = await res.json()
      
      if (data.success) {
        setMessage(data.message)
        setMessageType('success')
        // Reset after successful submission, close modal after short delay
        setTimeout(() => {
          setIsModalOpen(false)
          setName('')
          setEmail('')
          setRating(0)
          setReviewText('')
          setMessage('')
          setMessageType('')
        }, 2000)
      } else {
        setMessage(data.error)
        setMessageType('error')
      }
    } catch (err) {
      console.error('Error submitting review:', err)
      setMessage('Something went wrong! Please try again.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }, [name, email, rating, reviewText, productId, productName])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setName('')
    setEmail('')
    setRating(0)
    setReviewText('')
    setMessage('')
    setMessageType('')
  }, [])

  return (
    <>
      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      >
        {categoryName && <div className={styles.categoryLabel}>{categoryName}</div>}

        {productSku && (
          <div className={styles.skuRow}>
            <span className={styles.skuLabel}>SKU</span>
            <span className={styles.skuValue}>{productSku}</span>
          </div>
        )}

        {/* Rating Display */}
        {reviews.length > 0 && (
          <div className={styles.ratingRow} onClick={handleScrollToReviews} style={{ cursor: 'pointer' }}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`${styles.star} ${star <= Math.round(roundedRating) ? styles.starActive : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingValue}>{roundedRating}</span>
            <span className={styles.reviewCount}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
          </div>
        )}

        <h1 className={styles.productName}>{productName}</h1>

        <div className={styles.divider} aria-hidden="true" />

        {description && <p className={styles.description}>{description}</p>}

        {/* Write a Review Button */}
        <button onClick={() => setIsModalOpen(true)} className={styles.writeReviewBtn}>
           Write a Review
        </button>

        <div className={styles.actions}>
          <button onClick={handleScrollToForm} className={styles.btnQuote}>
            <MailIcon />
            Request Quote
          </button>

          {specsPdfUrl && (
            <a href={specsPdfUrl} target="_blank" rel="noopener noreferrer" className={styles.btnPdf} download>
              <FileIcon />
              Download PDF Brochure
            </a>
          )}
        </div>
      </motion.div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className={reviewStyles.modalOverlay} onClick={closeModal}>
          <div className={reviewStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={reviewStyles.modalHeader}>
              <h3 className={reviewStyles.formTitle}>Write a Review</h3>
              <button onClick={closeModal} className={reviewStyles.closeBtn}>✕</button>
            </div>
            {message && (
              <div className={`${reviewStyles.message} ${messageType === 'success' ? reviewStyles.success : reviewStyles.error}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className={reviewStyles.form}>
              <div className={reviewStyles.formGroup}>
                <label htmlFor="hero-name" className={reviewStyles.label}>Your Name</label>
                <input
                  id="hero-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={reviewStyles.input}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={reviewStyles.formGroup}>
                <label htmlFor="hero-email" className={reviewStyles.label}>Email</label>
                <input
                  id="hero-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={reviewStyles.input}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className={reviewStyles.formGroup}>
                <label className={reviewStyles.label}>Rating</label>
                <div className={reviewStyles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`${reviewStyles.star} ${rating >= star ? reviewStyles.active : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={reviewStyles.formGroup}>
                <label htmlFor="hero-review" className={reviewStyles.label}>Your Review</label>
                <textarea
                  id="hero-review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={reviewStyles.textarea}
                  placeholder="Tell us what you think..."
                  required
                  rows={4}
                />
              </div>

              <div className={reviewStyles.modalActions}>
                <button type="button" onClick={closeModal} className={reviewStyles.cancelBtn}>Cancel</button>
                <button type="submit" disabled={isSubmitting} className={reviewStyles.submitBtn}>
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
