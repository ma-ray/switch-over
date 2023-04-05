import urlParser from 'js-video-url-parser/lib/base';
import 'js-video-url-parser/lib/provider/youtube';

// Gets the YouTube video ID and current timestamp of the video if applicable.
// Returns the link of the video that starts at the timestamp.
export const getYoutubeLink = async(id, url) => {
  const parse = urlParser.parse(url);
  if (!parse || parse.mediaType !== 'video') {
    return null;
  }
  const frames = await chrome.scripting.executeScript({
    target: { tabId: id },
    function: () => {
      return Math.floor(document.getElementsByTagName('video')[0].currentTime);
    }
  });
  return `https://youtu.be/${parse.id}?t=${frames[0].result}`;
};
