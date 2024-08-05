import BlogPostCard from '@/components/cards/posts/BlogPostCard';
import EmptyState from '@/components/app/EmptyState';

interface IFeedPostListCard {
  posts: any[];
}

const FeedPostListCard = ({ posts }: IFeedPostListCard) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <EmptyState data={posts} title="No Posts To Display!">
        {posts?.map((blog, index) => (
          <BlogPostCard
            key={blog._id}
            {...blog}
            title={blog?.title}
            thumbnailUrl={
              index % 2 !== 0
                ? 'https://images.unsplash.com/photo-1716386480038-1e375da14e1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8'
                : undefined
            }
          />
        ))}
      </EmptyState>
    </div>
  );
};

export default FeedPostListCard;
