import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AnonymousSupport() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim() && files.length === 0) return;

        const formData = new FormData();
        formData.append('content', newPost);
        files.forEach((file) => formData.append('media', file));

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/posts', formData);
            setNewPost('');
            setFiles([]);
            fetchPosts();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6">
                    Anonymous Peer Support
                </h1>

                {/* Post Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded shadow-md mb-8 space-y-4"
                    encType="multipart/form-data"
                >
                    <textarea
                        className="w-full border p-2 rounded"
                        rows="3"
                        placeholder="Share how you're feeling..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    ></textarea>

                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => setFiles([...e.target.files])}
                        className="block"
                    />

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post Anonymously'}
                    </button>
                </form>

                {/* Posts List */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white p-4 rounded shadow-sm border"
                        >
                            <p className="text-gray-800 mb-2 whitespace-pre-wrap">
                                {post.content}
                            </p>

                            {/* Render each media item */}
                            {post.media?.map((item, idx) =>
                                item.type === 'image' ? (
                                    <img
                                        key={idx}
                                        src={item.url}
                                        alt={`Media ${idx}`}
                                        className="w-full rounded mb-2"
                                    />
                                ) : (
                                    <video
                                        key={idx}
                                        controls
                                        className="w-full rounded mb-2"
                                    >
                                        <source src={item.url} type="video/mp4" />
                                    </video>
                                )
                            )}

                            <p className="text-xs text-gray-500">
                                Posted on{' '}
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
