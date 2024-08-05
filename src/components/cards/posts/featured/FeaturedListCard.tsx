import React from 'react';
import PostAvatarContainer from '../utils/PostAvatarContainer';
import { countWords, estimateReadingTime, extractText } from '@/helpers/app/text.processor';

const FeaturedListCard = ({ data }) => {
  const author = data?.author;

  const extractedText = extractText(data?.content?.content);

  const wordCount = countWords(extractedText);
  const readingTime = estimateReadingTime(wordCount);

  return (
    <div>
      <PostAvatarContainer author={author} post={data} readingTime={readingTime} />
      <div>
        <h4>{data?.title}</h4>
      </div>
    </div>
  );
};

export default FeaturedListCard;
