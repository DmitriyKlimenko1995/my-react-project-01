import { useState, useEffect } from 'react';

const FollowButton = ({ targetId, refreshFlag }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId'); // ← откуда берём текущего пользователя

  useEffect(() => {
    // Получить статус подписки (по желанию)
    debugger;
    fetch(`http://localhost:5000/api/sub/is-following/${targetId}?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("response:", data);
        debugger;
        setIsFollowing(data.following);
      });
    debugger;
  }, [targetId, userId]);
  debugger;

  console.log(isFollowing);

  const toggleFollow = async () => {
    setLoading(true);
    const endpoint = isFollowing ? 'unfollow' : 'follow';

    const res = await fetch(`http://localhost:5000/api/sub/${endpoint}/${targetId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });

    if (res.ok) {
      setIsFollowing(prev => !prev);
    }
    setLoading(false);
    refreshFlag(prev => !prev);
  };

  return (
    <div>
      <div>
        {isFollowing}
      </div>
      <button onClick={toggleFollow} disabled={loading}>
        {loading ? '⏳' : isFollowing ? 'Отписаться' : 'Подписаться'}
      </button>
    </div>
  );
};

export default FollowButton;