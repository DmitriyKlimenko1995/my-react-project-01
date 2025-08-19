import { useSelector } from 'react-redux';
import friend_module from './SearchResults.module.css';
import userPhoto from './../../assets/images/avatar.png';

export default function SearchResults() {
  const { results, loading } = useSelector((state) => state.search);

  if (loading) return <p>Loading...</p>;
  if (!results.length) return <p>No results found.</p>;

  return (
    <ul>
      {results.map((user) => (
        <div key={user._id} className={friend_module.item}>
            <img src={typeof user.photoUrl === 'string' && user.photoUrl.trim() !== "" ? `http://localhost:5000${user.photoUrl}` : userPhoto} alt="avatar" />
            <div>{user.fullname}</div>
        </div>
      ))}
    </ul>
  );
}