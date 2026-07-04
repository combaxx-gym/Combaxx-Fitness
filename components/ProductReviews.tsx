'use client'

import { useState } from 'react'
import styles from '@/styles/components/ProductReviews.module.css'

interface Review {
  _id: string
  name: string
  rating: number
  reviewText: string
  approved: boolean
  submittedAt: string
}

interface ProductReviewsProps {
  productId: string
  productName: string
  initialReviews?: Review[]
}

export default function ProductReviews({ productId, productName, initialReviews = [] }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
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
        setName('')
        setEmail('')
        setRating(0)
        setReviewText('')
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
  }

  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Customer Reviews</span>
          <h2 className={styles.title} id="reviews-heading">What Our Customers Say</h2>
        </div>

        <div className={styles.content}>
          {/* Review Form */}
          <div className={styles.formWrap}>
            <h3 className={styles.formTitle}>Write a Review</h3>
            {message && (
              <div className={`${styles.message} ${messageType === 'success' ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Rating</label>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`${styles.star} ${rating >= star ? styles.active : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="review" className={styles.label}>Your Review</label>
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={styles.textarea}
                  placeholder="Tell us what you think..."
                  required
                  rows={4}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Review List */}
          <div className={styles.listWrap}>
            <h3 className={styles.listTitle}>{reviews.length} Approved Review{reviews.length !== 1 ? 's' : ''}</h3>
            {reviews.length === 0 ? (
              <div className={styles.empty}>
                No reviews yet. Be the first to review this product!
              </div>
            ) : (
              <div className={styles.list}>
                {reviews.map((review) => (
                  <div key={review._id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardName}>{review.name}</div>
                      <div className={styles.cardRating}>
                        {[1,2,3,4,5].map((star) => (
                          <span key={star} className={`${styles.cardStar} ${star <= review.rating ? styles.cardStarActive : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.cardDate}>{new Date(review.submittedAt).toLocaleDateString()}</div>
                    <p className={styles.cardText}>{review.reviewText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
