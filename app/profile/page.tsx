import { UserProfile } from "@clerk/nextjs"
import styles from "@/styles/pages/profile.module.css"

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <UserProfile />
    </div>
  )
}
