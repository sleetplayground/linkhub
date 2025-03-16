import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './ProfilePage.css';

interface ProfileData {
  name?: string;
  description?: string;
  image?: { url?: string; ipfs_cid?: string };
  backgroundImage?: { url?: string; ipfs_cid?: string };
  linktree?: Record<string, string>;
}

interface ApiResponse {
  [key: string]: {
    profile?: ProfileData;
  };
}

const ProfilePage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

    const fetchProfile = async () => {
      if (!accountId) return;

      // Check cache first
      const cachedData = localStorage.getItem(`profile-${accountId}`);
      if (cachedData) {
        const { profile: cachedProfile, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setProfile(cachedProfile);
          setLoading(false);
          // Fetch fresh data in background
          fetchFreshData();
          return;
        }
      }

      // If no cache or expired, fetch fresh data
      await fetchFreshData();
    };

    const fetchFreshData = async () => {
      try {
        const response = await fetch('https://rpc.web4.near.page/account/social.near/view/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keys: [`${accountId}/profile/**`]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ApiResponse;
        if (!accountId || !data || !data[accountId]?.profile) {
          setError('Profile not found');
          return;
        }

        const profileData = data[accountId].profile;
        // Update cache
        localStorage.setItem(`profile-${accountId}`, JSON.stringify({
          profile: profileData,
          timestamp: Date.now()
        }));

        setProfile(profileData);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accountId]);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profile) {
    return <div className="not-found">Profile not found</div>;
  }

  return (
    <div className="profile-container">
      {(profile.backgroundImage?.url || profile.backgroundImage?.ipfs_cid) && (
        <div className="profile-banner">
          <img
            src={profile.backgroundImage.url ?
              (profile.backgroundImage.url.startsWith('http') ? profile.backgroundImage.url : `https://ipfs.near.social/ipfs/${profile.backgroundImage.url}`) :
              `https://ipfs.near.social/ipfs/${profile.backgroundImage.ipfs_cid}`
            }
            alt="Profile Banner"
            className="profile-banner-image"
          />
        </div>
      )}
      <div className="profile-header">
        {(profile.image?.url || profile.image?.ipfs_cid) && (
          <img 
            src={profile.image.url ? 
              (profile.image.url.startsWith('http') ? profile.image.url : `https://ipfs.near.social/ipfs/${profile.image.url}`) :
              `https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`
            } 
            alt={profile.name || 'Profile'} 
            className="profile-image"
          />
        )}
        <h1 className="profile-name">{profile.name || 'Anonymous'}</h1>
        {profile.description && (
          <div>
            <div className={`profile-description ${isExpanded ? 'expanded' : ''}`}>
              <ReactMarkdown>
                {profile.description}
              </ReactMarkdown>
            </div>
            {profile.description.length > 200 && (
              <button 
                className="show-more-btn" 
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}
      </div>

      {profile.linktree && Object.keys(profile.linktree).length > 0 && (
        <div className="social-links">
          {Object.entries(profile.linktree)
            .filter(([platform, handle]) => {
              if (platform.trim() === '') return false;
              if (!handle || handle.trim() === '') return false;
              return true;
            })
            .map(([platform, handle]) => {
              let emoji = '🔗';
              let url = '';
              
              switch (platform.toLowerCase()) {
                case 'website':
                  emoji = '🌐';
                  url = handle.startsWith('http') ? handle : `https://${handle}`;
                  break;
                case 'twitter':
                  emoji = '𝕏';
                  url = `https://twitter.com/${handle.replace('@', '')}`;
                  break;
                case 'github':
                  emoji = '🐱';
                  url = `https://github.com/${handle.replace('@', '')}`;
                  break;
                case 'telegram':
                  emoji = '✈️';
                  url = `https://t.me/${handle.replace('@', '')}`;
                  break;
                default:
                  url = handle.startsWith('http') ? handle : `https://${handle}`;
              }

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <div className="social-link-content">
                    <span className="social-link-emoji">{emoji}</span>
                    <span className="social-link-text">{handle.replace('https://', '').replace('@', '')}</span>
                  </div>
                </a>
              );
            })}
        </div>
      )}

      <a
        href={`https://${accountId}.social`}
        target="_blank"
        rel="noopener noreferrer"
        className="near-social-link"
      >
        <div className="social-link-content">
          <span className="social-link-emoji">Ｏ</span>
          <span className="social-link-text">Join on NEAR Social</span>
        </div>
      </a>
    </div>
  );
};

export default ProfilePage;