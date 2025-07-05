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

    const handleDelete = async (postId) => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`);
            setPosts((prev) => prev.filter((post) => post._id !== postId));
        } catch (err) {
            alert('Failed to delete post');
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
            alert('Post failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0c2f] to-[#2a0c4e] text-purple-100 font-sans">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12 animate-fadeIn">
                <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Anonymous Peer Support
                </h1>

                {/* Post Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-md border border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.2)] p-6 rounded-2xl space-y-4 mb-10 transition-all"
                    encType="multipart/form-data"
                >
                    <textarea
                        className="w-full bg-white/10 text-purple-100 placeholder-purple-300 px-4 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
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
                        className="block text-purple-300"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-all duration-300"
                    >
                        {loading ? 'Posting...' : 'Post Anonymously'}
                    </button>
                </form>

                {/* Posts */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="relative bg-white/5 backdrop-blur-md p-5 rounded-xl border border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] transition-all duration-300 group"
                        >
                            <p className="text-purple-100 mb-2 whitespace-pre-wrap text-sm">
                                {post.content}
                            </p>

                            {/* Media */}
                            {post.media?.map((item, idx) =>
                                item.type === 'image' ? (
                                    <img
                                        key={idx}
                                        src={item.url}
                                        alt={`Media ${idx}`}
                                        className="w-full rounded mb-3 border border-purple-300"
                                    />
                                ) : (
                                    <video
                                        key={idx}
                                        controls
                                        className="w-full rounded mb-3 border border-purple-300"
                                    >
                                        <source src={item.url} type="video/mp4" />
                                    </video>
                                )
                            )}

                            <p className="text-xs text-purple-300 italic">
                                Posted on {new Date(post.createdAt).toLocaleString()}
                            </p>

                            {/* Delete Button (assuming auth or owner check handled on backend) */}
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md shadow-sm transition-all duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
