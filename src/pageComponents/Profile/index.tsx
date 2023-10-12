import React, { useState } from 'react'
import styles from '../Home/HomeContent.module.scss'

/* Types */
import { ProfilePageProps } from '../../pages/profile/[uid]'

/* Child Components */
import ProfileHeader from '../../components/ProfileHeader'
import RecipeCardList from '../../components/RecipeCardList'

enum ProfileTabs {
  PublishedRecipes = 'publishedRecipes',
  LikedRecipes = 'likedRecipes',
}

const ProfilePageContent: React.FunctionComponent<ProfilePageProps> = ({
  firstName,
  lastName,
  username,
  publishedRecipes,
  likedRecipes,
}) => {
  const [content, switchContent] = useState<ProfileTabs>(
    ProfileTabs.PublishedRecipes,
  )
  return (
    <div>
      <ProfileHeader
        firstName={firstName}
        lastName={lastName}
        username={username}
      />
      <div className={styles.subNavWrapper}>
        <div className={styles.bottomBar} />
        <div className={styles.subNavLinkWrapper}>
          <button
            className={`${styles.subNavLink} ${
              content === ProfileTabs.PublishedRecipes && styles.activeTab
            }`}
            onClick={() => switchContent(ProfileTabs.PublishedRecipes)}
            aria-label="Published Recipes"
          >
            Published Recipes
          </button>
          <button
            className={`${styles.subNavLink} ${
              content === ProfileTabs.LikedRecipes && styles.activeTab
            }`}
            onClick={() => switchContent(ProfileTabs.LikedRecipes)}
            aria-label="Liked Recipes"
          >
            Liked Recipes
          </button>
        </div>
      </div>
      {content === ProfileTabs.PublishedRecipes && (
        <RecipeCardList
          recipes={publishedRecipes}
          emptyListText={`${firstName} hasn't published any recipes yet.`}
          hideAuthor
          hidePublic
        />
      )}
      {content === ProfileTabs.LikedRecipes && (
        <RecipeCardList
          recipes={likedRecipes}
          emptyListText={`${firstName} hasn't liked any recipes yet.`}
          hidePublic
        />
      )}
    </div>
  )
}

export default ProfilePageContent
