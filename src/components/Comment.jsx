import React from 'react';
import { timeAgo } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

const Comment = ({ comment, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const canDelete = user?._id === comment.author?._id || isAdmin;

  return (
    <div className="comment">
      <div className="comment__header">
        <div>
          <span className="comment__author">
            {comment.author?.username || 'Anonymous'}
          </span>
          <span className="comment__time"> · {timeAgo(comment.createdAt)}</span>
        </div>
        
        {canDelete && (
          <button 
            className="comment__delete" 
            onClick={() => onDelete(comment._id)}
          >
            Delete
          </button>
        )}
      </div>
      
      <div className="comment__content">
        {comment.content}
      </div>
    </div>
  );
};

export default Comment;