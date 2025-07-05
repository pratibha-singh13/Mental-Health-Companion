import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Heart, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AnonymousSupport() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [commentText, setCommentText] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { 'x-auth-token': token },
                });
                setUserId(res.data.id);
            } catch (err) {
                console.error('Failed to fetch user');
            }
        };

        fetchUser();
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/posts');
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { 'x-auth-token': token },
            });
            fetchPosts();
        } catch (err) {
            alert('Failed to delete post');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim() && files.length === 0) return;

        const formData = new FormData();
        formData.append('content', newPost);
        files.forEach((file) => formData.append('media', file));

        const token = localStorage.getItem('token');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNewPost('');
            setFiles([]);
            fetchPosts();
        } catch (err) {
            alert('Post failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/posts/${postId}/like`, {}, {
                headers: { 'x-auth-token': token },
            });
            fetchPosts();
        } catch (err) {
            console.error('Like failed');
        }
    };

    const handleComment = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/posts/${postId}/comment`,
                { text: commentText[postId] },
                { headers: { 'x-auth-token': token } }
            );
            setCommentText(prev => ({ ...prev, [postId]: '' }));
            fetchPosts();
        } catch (err) {
            console.error('Comment failed');
        }
    };

    const myPosts = posts.filter((post) => post.owner?._id?.toString() === userId?.toString());
    const otherPosts = posts.filter((post) => post.owner?._id?.toString() !== userId?.toString());

    const renderPost = (post) => (
        <div
            key={post._id}
            className="relative bg-white/5 backdrop-blur-lg p-5 sm:p-6 rounded-2xl border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(192,132,252,0.6)] transition-all duration-300 space-y-4"
        >
            <p className="text-purple-100 text-sm whitespace-pre-wrap">{post.content}</p>

            {post.media?.map((item, idx) =>
                item.type === 'image' ? (
                    <img
                        key={idx}
                        src={item.url}
                        alt="Media"
                        className="w-full rounded-xl border border-purple-300 object-cover"
                    />
                ) : (
                    <video key={idx} controls className="w-full rounded-xl border border-purple-300">
                        <source src={item.url} type="video/mp4" />
                    </video>
                )
            )}

            <div className="text-xs text-purple-300 italic flex justify-between items-center">
                <span>{new Date(post.createdAt).toLocaleString()}</span>
                {post.owner?._id === userId && (
                    <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-400 hover:text-red-500 transition"
                        title="Delete post"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            <div className="flex items-center gap-6 text-fuchsia-300 text-sm">
                <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-1 transition-transform hover:scale-110 active:scale-95 group"
                >
                    {post.likedBy.includes(userId) ? (
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:animate-ping-slow" />
                    ) : (
                        <Heart className="w-5 h-5 text-purple-300" />
                    )}
                    <span>{post.reactions || 0}</span>
                </button>
            </div>


            <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-fuchsia-300" />
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText[post._id] || ''}
                        onChange={(e) => setCommentText(prev => ({ ...prev, [post._id]: e.target.value }))}
                        className="flex-1 px-3 py-1 rounded bg-purple-100 text-black text-sm"
                    />
                    <button
                        onClick={() => handleComment(post._id)}
                        className="text-sm text-fuchsia-200 hover:underline"
                    >
                        Comment
                    </button>
                </div>

                <ul className="text-sm text-purple-200 list-disc ml-5">
                    {post.comments?.map((c, i) => (
                        <li key={i}>{c.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

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

                <h2 className="text-xl font-bold mb-4 border-b border-purple-500 pb-2">My Posts</h2>
                <div className="space-y-8 mb-10">
                    {myPosts.map(renderPost)}
                </div>

                <h2 className="text-xl font-bold mb-4 border-b border-purple-500 pb-2">Other Posts</h2>
                <div className="space-y-8">
                    {otherPosts.map(renderPost)}
                </div>
            </div>
        </div>
    );
}
