import React from "react";
import clsx from "clsx";

type ToCItemProps = {
  item: {
    id: string;
    level: number;
    isActive: boolean;
    isScrolledOver: boolean;
    textContent: string;
    itemIndex: number;
  };
  onItemClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => void;
};

const ToCItem: React.FC<ToCItemProps> = ({ item, onItemClick }) => {
  return (
    <div
      className={`pl-${item.level * 2} my-1`}
      style={{ "--level": item.level } as React.CSSProperties}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        className={clsx(
          "block rounded transition-colors duration-200",
          item.isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent",
          item.isScrolledOver && !item.isActive
            ? "text-gray-500"
            : "text-black dark:text-white"
        )}
      >
        {item.itemIndex}. {item.textContent}
      </a>
    </div>
  );
};

export default ToCItem;
