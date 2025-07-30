// Helper functions to handle various image sources including Google Drive

/**
 * Converts a Google Drive sharing link to a direct image URL
 * @param {string} driveUrl - The Google Drive sharing URL
 * @returns {string} - A direct image URL that can be used in img tags
 */
export const getGoogleDriveDirectUrl = (driveUrl) => {
  // Check if it's a Google Drive URL
  if (!driveUrl || typeof driveUrl !== 'string') {
    return driveUrl;
  }

  // Handle Google Drive links
  if (driveUrl.includes('drive.google.com/file/d/')) {
    // Extract the file ID from the URL
    const fileIdMatch = driveUrl.match(/\/d\/([^/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Create a direct URL for embedding
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  // Return the original URL if it's not a Google Drive URL or if extraction fails
  return driveUrl;
};

/**
 * Processes any image URL to ensure it displays correctly
 * @param {string} imageUrl - The image URL to process
 * @returns {string} - The processed URL ready for display
 */
export const processImageUrl = (imageUrl) => {
  // Check if it's a Google Drive URL
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('drive.google.com')) {
    return getGoogleDriveDirectUrl(imageUrl);
  }

  // For other URLs, return as is
  return imageUrl;
};