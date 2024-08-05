import { Badge } from '@/components/ui/badge';
import { countWords, estimateReadingTime, extractText } from '@/helpers/app/text.processor';
import { RootState } from '@/services/store';
import { extractFirstParagraph, getRandomColor } from '@/utils/utils';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import PostAvatarContainer from './utils/PostAvatarContainer';
import SavePostButton from './utils/SavePostLink';

interface BlogPostCardProps {
  thumbnailUrl?: string;
  authorAvatarUrl: string;
  authorName: string;
  datePosted: string;
  title: string;
  description: string;
  tags: string[];
  readMinutes: number;
  onFollow: () => void;
  onSave: () => void;
  onMenuSelect: (option: string) => void;
  author?: any;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  thumbnailUrl,
  authorAvatarUrl,
  authorName,
  datePosted,
  title,
  description,
  tags,
  readMinutes,

  onFollow,
  onSave,
  onMenuSelect,
  author,
  ...data
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const desc = extractFirstParagraph(data?.content?.content);
  console.log('desc', desc);

  const extractedText = extractText(data?.content?.content);

  const wordCount = countWords(extractedText);
  const readingTime = estimateReadingTime(wordCount);
  console.log('readingTime', readingTime);

  return (
    <div className="col-span-1 border-b overflow-hidden">
      <div className={`p-4 flex flex-col w-full`}>
        <PostAvatarContainer author={author} post={data} readingTime={readingTime} />
        <Link href={`/posts/${data?._id}`}>
          {data?.thumbnail && (
            <div className="w-full flex-shrink-0 rounded-md my-4">
              <img
                className="object-cover h-[200px] w-full rounded-md"
                src={data?.thumbnail}
                alt="Blog thumbnail"
                //   width={1920}
                height={200}
              />
            </div>
          )}
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-gray-600">
              {/* {description} */}
              {desc}
            </p>
          </div>
        </Link>
        {/* <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
          <span>{readingTime} min read</span>
        </div> */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap space-x-2">
            {tags?.length
              ? tags.map((tag) => (
                  <Badge key={tag} color={getRandomColor()}>
                    {tag}
                  </Badge>
                ))
              : null}
          </div>
          <SavePostButton postId={data?._id} initiallySaved={data?.savedBy?.includes(user?._id)} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
