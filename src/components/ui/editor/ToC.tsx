// import { IconListSearch } from "@tabler/icons-react";
// import { TextSelection } from "@tiptap/pm/state";
// import clsx from "clsx";
// import { ArrowUp } from "lucide-react";
// import { useState } from "react";

// const ToCItem = ({ item, onItemClick, setActive, index, active }) => {
//   return (
//     <button
//       // href={item.link}
//       type="button"
//       onClick={(e) => {
//         // event.preventDefault();
//         setActive(index);
//         onItemClick(e, item?.id);
//       }}
//       key={item.label}
//       className={clsx(
//         " text-sm h-[38px] w-full text-gray-900 dark:text-gray-100 border-l-2 border-gray-200 dark:border-gray-600 rounded-r-md px-4 flex items-center",
//         {
//           "font-semibold text-blue-700 dark:text-blue-400": active === index,
//           "hover:bg-gray-100 dark:hover:bg-gray-700": true,
//           "bg-gray-100": active === index,
//         }
//       )}
//       style={{ paddingLeft: `calc(${item.order} * 1rem)` }}
//     >
//       {/* {item.itemIndex}.{item.textContent} */}
//       {item?.textContent}
//     </button>
//   );
// };

// export const ToCEmptyState = () => {
//   return null;
// };

// export const ToC = ({ items = [], editor }) => {
//   const [active, setActive] = useState(1);
//   // const { editor } = useCurrentEditor();
//   console.log("editor", editor);
//   console.log("items", items);
//   if (items.length === 0) {
//     // return <ToCEmptyState />;
//     return null;
//   }

//   const onItemClick = (e, id) => {
//     e.preventDefault();

//     if (editor) {
//       const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
//       const pos = editor.view.posAtDOM(element, 0);

//       // set focus
//       const tr = editor.view.state.tr;

//       tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

//       editor.view.dispatch(tr);

//       editor.view.focus();

//       if (history.pushState) {
//         // eslint-disable-line
//         history.pushState(null, null, `#${id}`); // eslint-disable-line
//       }

//       window.scrollTo({
//         top: element.getBoundingClientRect().top + window.scrollY,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="toc--list">
//       <div className="relative mt-14 text-gray-600">
//         <div className="flex items-center mb-4">
//           <IconListSearch className="w-[18px] h-[18px]" stroke={1.5} />
//           <span className="ml-2">Table of contents</span>
//         </div>
//         <div className="relative border-b pb-5">
//           <div
//             className="transition-transform duration-150 ease-in-out border-2 border-blue-700 dark:border-blue-400 bg-white dark:bg-gray-800 h-[10px] w-[10px] rounded-full absolute left-[calc(-5px + 1rem)] -left-1"
//             style={{
//               transform: `translateY(calc(${active} * 38px + calc((38px - 10px) / 2)))`,
//             }}
//           />
//           {items.map((item, index) => (
//             <ToCItem
//               setActive={setActive}
//               onItemClick={onItemClick}
//               key={item.id}
//               index={index}
//               active={active}
//               item={{ ...item, itemIndex: index + 1 }}
//             />
//           ))}
//         </div>
//         <div className="mt-2">
//           <button className="flex gap-2 items-center text-gray-600 w-full hover:bg-gray-100 p-2 rounded-md">
//             <ArrowUp size={16} /> Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { IconListSearch } from "@tabler/icons-react";
import { TextSelection } from "@tiptap/pm/state";
import clsx from "clsx";
import { ArrowUp } from "lucide-react";

const ToCItem = ({ item, onItemClick, setActive, index, active }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        setActive(index);
        onItemClick(e, item.id);
      }}
      className={clsx(
        "text-sm h-[38px] w-full text-gray-900 dark:text-gray-100 border-l-2 border-gray-200 dark:border-gray-600 rounded-r-md px-4 flex items-center",
        {
          "font-semibold text-blue-700 dark:text-blue-400": active === index,
          "hover:bg-gray-100 dark:hover:bg-gray-700": true,
          "bg-gray-100": active === index,
        }
      )}
      style={{ paddingLeft: `calc(${item.order} * 1rem)` }}
    >
      {item.textContent}
    </button>
  );
};

export const ToCEmptyState = () => {
  return null;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ToC = ({ items = [], editor }) => {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!items.length) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          setActive(index);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    itemRefs.current = items.map((item) => {
      const element = document.querySelector(`[data-toc-id="${item.id}"]`);
      if (element) {
        observer.observe(element);
      }
      return element;
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
      const pos = editor.view.posAtDOM(element, 0);

      const tr = editor.view.state.tr;
      tr?.setSelection(new TextSelection(tr?.doc?.resolve(pos)));

      editor.view.dispatch(tr);
      editor.view.focus();

      if (history.pushState) {
        history.pushState(null, null, `#${id}`);
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) {
    return <ToCEmptyState />;
  }

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
          <button
            className="flex gap-2 items-center text-gray-600 w-full hover:bg-gray-100 p-2 rounded-md"
            onClick={scrollToTop}
          >
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </div>
    </div>
  );
};
