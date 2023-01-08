import urlParser from 'js-video-url-parser/lib/base';
import 'js-video-url-parser/lib/provider/youtube';

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
