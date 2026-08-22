import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get('http://localhost:5001/api/notes');

        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching notes.', error);

        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLimitedUI />}
    </div>
  );
}
