// Format date for display
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Convert to relative time (e.g., "2 hours ago")
export const timeAgo = (dateStr) => {
  const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return interval === 1 ? `${interval} ${name} ago` : `${interval} ${name}s ago`;
    }
  }
  return 'just now';
};

// Article categories
export const CATEGORIES = ['All', 'Tech', 'Lifestyle', 'Food', 'Travel', 'Business', 'Health'];