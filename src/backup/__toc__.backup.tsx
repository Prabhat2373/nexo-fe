import { Button } from "@/components/ui/button";
import { IconListSearch } from "@tabler/icons-react";
import { TextSelection } from "@tiptap/pm/state";
import { useCurrentEditor } from "@tiptap/react";
import clsx from "clsx";
import { ArrowUp, MoveUp } from "lucide-react";
import { useState } from "react";

// export const ToCItem = ({ item, onItemClick }) => {
//   return (
//     <div
//       className={`toc--item toc--item--level_${item.level}`}
//       style={{
//         "--level": item.level,
//       }}
//     >
//       <a
//         style={{
//           display: "block",
//           backgroundColor: item.isActive ? "rgba(0, 0, 0, .05)" : "transparent",
//           color: item.isScrolledOver && !item.isActive ? "#888" : "#000",
//           borderRadius: "4px",
//         }}
//         href={`#${item.id}`}
//         onClick={(e) => onItemClick(e, item.id)}
//       >
//         {item.itemIndex}. {item.textContent}
//       </a>
//     </div>
//   );
// };

// const ToCItem = ({ item, onItemClick }) => {
//   return (
//     <div
//       className={`pl-${item.level * 2} my-1`}
//       style={{
//         "--level": item.level,
//       }}
//     >
//       <a
//         href={`#${item.id}`}
//         onClick={(e) => onItemClick(e, item.id)}
//         className={`
//           block
//           rounded
//           transition-colors
//           duration-200
//           ${item.isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent"}
//           ${
//             item.isScrolledOver && !item.isActive
//               ? "text-gray-500"
//               : "text-black dark:text-white"
//           }
//         `}
//       >
//         {item.itemIndex}. {item.textContent}
//       </a>
//     </div>
//   );
// };

// const ToCItem: React.FC<any> = ({ item, onItemClick }) => {
//   return (
//     <div
//       className={`pl-${item.level * 2} my-1`}
//       style={{ "--level": item.level } as React.CSSProperties}
//     >
//       <a
//         href={`#${item.id}`}
//         onClick={(e) => onItemClick(e, item.id)}
//         className={clsx(
//           "block rounded transition-colors duration-200",
//           item.isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent",
//           item.isScrolledOver && !item.isActive
//             ? "text-gray-500"
//             : "text-black dark:text-white"
//         )}
//       >
//         {item.itemIndex}. {item.textContent}
//       </a>
//     </div>
//   );
// };

const ToCItem = ({ item, onItemClick, setActive, index, active }) => {
  return (
    <button
      // href={item.link}
      type="button"
      onClick={(e) => {
        // event.preventDefault();
        setActive(index);
        onItemClick(e, item?.id);
      }}
      key={item.label}
      className={clsx(
        " text-sm h-[38px] w-full text-gray-900 dark:text-gray-100 border-l-2 border-gray-200 dark:border-gray-600 rounded-r-md px-4 flex items-center",
        {
          "font-semibold text-blue-700 dark:text-blue-400": active === index,
          "hover:bg-gray-100 dark:hover:bg-gray-700": true,
          "bg-gray-100": active === index,
        }
      )}
      style={{ paddingLeft: `calc(${item.order} * 1rem)` }}
    >
      {/* {item.itemIndex}.{item.textContent} */}
      {item?.textContent}
    </button>
  );
};

export const ToCEmptyState = () => {
  return null;
};

export const ToC = ({ items = [], editor }) => {
  const [active, setActive] = useState(1);
  // const { editor } = useCurrentEditor();
  console.log("editor", editor);
  console.log("items", items);
  if (items.length === 0) {
    // return <ToCEmptyState />;
    return null;
  }

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      const pos = editor.view.posAtDOM(element, 0);

      // set focus
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);

      editor.view.focus();

      if (history.pushState) {
        // eslint-disable-line
        history.pushState(null, null, `#${id}`); // eslint-disable-line
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="toc--list">
      <div className="relative mt-14 text-gray-600">
        <div className="flex items-center mb-4">
          <IconListSearch className="w-[18px] h-[18px]" stroke={1.5} />
          <span className="ml-2">Table of contents</span>
        </div>
        <div className="relative border-b pb-5">
          <div
            className="transition-transform duration-150 ease-in-out border-2 border-blue-700 dark:border-blue-400 bg-white dark:bg-gray-800 h-[10px] w-[10px] rounded-full absolute left-[calc(-5px + 1rem)] -left-1"
            style={{
              transform: `translateY(calc(${active} * 38px + calc((38px - 10px) / 2)))`,
            }}
          />
          {items.map((item, index) => (
            <ToCItem
              setActive={setActive}
              onItemClick={onItemClick}
              key={item.id}
              index={index}
              active={active}
              item={{ ...item, itemIndex: index + 1 }}
            />
          ))}
        </div>
        <div className="mt-2">
          <button className="flex gap-2 items-center text-gray-600 w-full hover:bg-gray-100 p-2 rounded-md">
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </div>
    </div>
  );
};
