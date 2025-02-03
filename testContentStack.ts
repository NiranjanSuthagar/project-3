// testContentstack.ts

const baseUrl = 'https://cdn.contentstack.io'; // Base URL for Contentstack CDN API
const contentTypeUid = 'video_comment'; // Replace with your content type UID
const videoId = 'blt81a3a08518cff783'; // Replace with the video ID you want to query

const fetchComments = async (id: string) => {
  const queryUrl = `${baseUrl}/v3/content_types/${contentTypeUid}/entries?query={"vid_id": "blt8e53b3819ab5c5dc"}`;

  try {
    const response = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'access_token': "csd697b1c1b981e3350ed5e3ca",
        'api_key': "blt296edefacaa1b7d2",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Fetched Comments:', data.entries); // Log the fetched entries (comments)
    return data.entries;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Test the function with the given videoId
fetchComments(videoId).then((comments) => {
  if (comments) {
    console.log('Successfully fetched comments:', comments);
  } else {
    console.log('No comments found.');
  }
});
