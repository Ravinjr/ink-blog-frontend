import React, { useState } from 'react';
import { articlesAPI } from '../services/api';
import { CATEGORIES } from '../utils/helpers';

const EditorView = ({ article, onBack, showToast }) => {
  const [data, setData] = useState({
    title: article?.title || '',
    excerpt: article?.excerpt || '',
    body: article?.body || '',
    category: article?.category || 'Tech',
    status: article?.status || 'draft',
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async (status) => {
    if (!data.title.trim()) {
      showToast('Please add a title');
      return;
    }
    if (!data.body.trim()) {
      showToast('Please add some content');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: data.title,
        excerpt: data.excerpt || data.body.slice(0, 140) + '…',
        body: data.body,
        category: data.category,
        status,
      };

      if (article?._id) {
        await articlesAPI.update(article._id, payload);
        showToast(status === 'published' ? 'Article published!' : 'Draft saved!');
      } else {
        await articlesAPI.create(payload);
        showToast(status === 'published' ? 'Article published!' : 'Draft created!');
      }

      onBack();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-view">
      <div className="editor-view__top">
        <div className="editor-view__top-left">
          <button className="article-view__back" onClick={onBack}>
            ← Cancel
          </button>
          <div className="status-badge">
            <span className={`status-badge__dot status-badge__dot--${data.status}`} />
            {article?._id
              ? data.status === 'published'
                ? 'Published'
                : 'Draft'
              : 'New Article'}
          </div>
        </div>
        
        <div className="editor-view__top-right">
          <button
            className="btn btn--outline btn--sm"
            onClick={() => handleSave('draft')}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            className="btn btn--primary btn--sm"
            onClick={() => handleSave('published')}
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="editor-cat-row">
        <label className="editor-label" style={{ marginBottom: 0 }}>
          Category
        </label>
        <select
          className="editor-cat-select"
          value={data.category}
          onChange={(e) => setData((d) => ({ ...d, category: e.target.value }))}
        >
          {CATEGORIES.filter((c) => c !== 'All').map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <input
        className="editor-title-input"
        placeholder="Article title…"
        value={data.title}
        onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
      />
      
      <input
        className="editor-excerpt-input"
        placeholder="Write a short excerpt (optional)…"
        value={data.excerpt}
        onChange={(e) => setData((d) => ({ ...d, excerpt: e.target.value }))}
      />
      
      <div className="editor-divider" />
      
      <textarea
        className="editor-body-textarea"
        placeholder="Start writing your article here…"
        value={data.body}
        onChange={(e) => setData((d) => ({ ...d, body: e.target.value }))}
      />
    </div>
  );
};

export default EditorView;