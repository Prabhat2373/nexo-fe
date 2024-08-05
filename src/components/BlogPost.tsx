import React from 'react';

import RichTextEditor from '@/components/ui/editor/RichTextEditor';

import PostDiscussionContainer from '@/containers/posts/overview/discussion/PostDiscussionContainer';
import PostAvatarContainer from './cards/posts/utils/PostAvatarContainer';

const BlogPost = ({ content, meta }) => {
  const renderContent = (node) => {
    switch (node.type) {
      case 'heading':
        return React.createElement(
          `h${node.attrs?.level}`,
          { style: { textAlign: node.attrs?.textAlign } },
          node.content?.map((child, index) => renderContent(child))
        );
      case 'paragraph':
        return (
          <p style={{ textAlign: node.attrs?.textAlign }}>
            {node.content?.map((child, index) => renderContent(child))}
          </p>
        );
      case 'text':
        let textElement = node.text;
        node.marks?.forEach((mark) => {
          switch (mark.type) {
            case 'bold':
              textElement = <b key={node.text}>{textElement}</b>;
              break;
            case 'highlight':
              textElement = <mark key={node.text}>{textElement}</mark>;
              break;
            case 'code':
              textElement = <code key={node.text}>{textElement}</code>;
              break;
            case 'textStyle':
              textElement = (
                <span key={node.text} style={{ color: mark?.attrs?.color }}>
                  {textElement}
                </span>
              );
              break;
            default:
              break;
          }
        });
        return textElement;
      case 'image':
        return (
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ''}
            title={node.attrs?.title || ''}
            style={{
              width: node.attrs?.width || 'auto',
              height: node.attrs?.height || 'auto',
              cursor: node.attrs?.cursor || 'auto',
              justifyContent: node.attrs?.justifyContent || 'auto',
              ...(node.attrs?.style
                ? node.attrs.style.split(';').reduce((acc, style) => {
                    const [key, value] = style.split(':');
                    acc[key.trim()] = value?.trim();
                    return acc;
                  }, {})
                : {})
            }}
            draggable={node.attrs?.draggable}
          />
        );
      default:
        return null;
    }
  };

  const author = meta?.author;
  console.log('author', author);
  return (
    <div>
      {/* {content.content?.map((node, index) => (
        <div key={index}>{renderContent(node)}</div>
      ))} */}

      {/* <TableOfContents /> */}

      <RichTextEditor
        value={content}
        readOnly={true}
        children={
          // <div className="flex items-center space-x-4 justify-between m-3 border-b pb-4">
          //   <div className="flex items-start space-x-4">
          //     <Link href={`/authors/profile/${author?._id}`} className="flex items-start space-x-4">
          //       <Avatar className="cursor-pointer">
          //         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          //         <AvatarFallback>CN</AvatarFallback>
          //       </Avatar>
          //       <div className="text-sm flex flex-col">
          //         <div className="flex gap-2 items-center">
          //           <p className="text-gray-900 leading-none">@{author?.name}</p>
          //           <Button
          //             variant={'link'}
          //             // onClick={onFollow}
          //             // className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
          //             className="m-0 p-0 h-4 text-primary"
          //           >
          //             Follow
          //           </Button>
          //         </div>
          //         <div className="flex gap-2 items-center text-gray-600">
          //           <p className="text-gray-600 text-xs mt-1">{'17 nov 2024'}</p>•
          //           <p className="text-gray-600 text-xs mt-1">{'10 min read'}</p>
          //         </div>
          //       </div>
          //     </Link>
          //   </div>
          //   <WithTooltip description={'More Options'}>
          //     <Menubar>
          //       <MenubarMenu>
          //         <MenubarTrigger className="border-none">
          //           <Ellipsis />
          //         </MenubarTrigger>
          //         <MenubarContent>
          //           <MenubarItem>Edit</MenubarItem>
          //           <MenubarItem>Delete</MenubarItem>
          //           <MenubarItem>Report</MenubarItem>
          //         </MenubarContent>
          //       </MenubarMenu>
          //     </Menubar>
          //   </WithTooltip>
          // </div>
          <div className="flex items-center space-x-4 justify-between m-3 border-b pb-4">
            <PostAvatarContainer author={author} post={meta} readingTime={10} />
          </div>
        }
        onChange={(cont) => console.log('changed', cont)}
      />
      <PostDiscussionContainer />
    </div>
  );
};

export default BlogPost;
