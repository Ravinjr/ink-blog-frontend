import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { commentsAPI } from '../services/api';
import Comment from './Comment';

const CommentSection = ({ articleId, onShowAuth, showToast }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    try {
      const { data } = await commentsAPI.getByArticle(articleId);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      onShowAuth('login');
      return;
    }
    
    if (!commentText.trim()) return;

    try {
      await commentsAPI.create(articleId, commentText);
      setCommentText('');
      loadComments();
      showToast('Comment posted!');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to post comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await commentsAPI.delete(commentId);
      loadComments();
      showToast('Comment deleted');
    } catch (error) {
      showToast('Failed to delete comment');
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder={user ? 'Share your thoughts...' : 'Please log in to comment'}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={!user}
        />
        <button
          type="submit"
          className="btn btn--primary btn--sm"
          disabled={!user || !commentText.trim()}
        >
          Post Comment
        </button>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '20px 0' }}>
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <Comment 
              key={comment._id} 
              comment={comment} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;