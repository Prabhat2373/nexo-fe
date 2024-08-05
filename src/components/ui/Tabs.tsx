'use client';
import React, { HTMLAttributes, createContext, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

interface TabsContextProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  fill?: boolean;
  vertical?: boolean;
}

const TabsContext = createContext<TabsContextProps>({
  active: 'all',
  setActive: () => {}
});

interface TabsProps {
  className?: string;
  fill?: boolean;
  vertical?: boolean;
  children: React.ReactNode;
  active?: any;
}

function Tabs(props: TabsProps): JSX.Element {
  const [active, setActive] = useState<string>(props?.active ?? 'all');
  const attrs = {
    ...props,
    className: classNames(
      {
        'lg:flex block lg:space-x-4 w-full ': props.vertical
      },
      props.className
    )
  };

  useEffect(() => {
    if (props?.active) {
      setActive(props?.active);
    }
  }, [props?.active]);

  return (
    <TabsContext.Provider
      value={{
        active,
        setActive,
        fill: props.fill,
        vertical: props.vertical
      }}
    >
      <div {...attrs}>{props.children}</div>
    </TabsContext.Provider>
  );
}

export default Tabs;

interface TabLinksProps {
  className?: string;
  children: React.ReactNode;
}

export function TabLinks(props: TabLinksProps): JSX.Element {
  const { fill, vertical } = useContext(TabsContext);

  return (
    <ul
      className={classNames(
        'dark:border-gray-700 border-b bg-transparent border-border-foreground overflow-x-auto overflow-y-hidden',
        {
          'justify-between space-x-3': fill && !vertical,
          flex: !vertical,
          ' lg:block flex ': vertical
        },
        props.className
      )}
    >
      {props.children}
    </ul>
  );
}

interface TabLinkProps extends HTMLAttributes<HTMLElement> {
  target?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: any;
  active?: boolean;
}

export function TabLink(props: TabLinkProps): JSX.Element {
  const { active, setActive, fill, vertical } = useContext(TabsContext);
  const isActive = props.active || active === props.target;

  const attrs = {
    ...props,
    className: classNames('cursor-pointer', props.className, {
      'w-full': fill
    })
  };

  return (
    <li
      {...attrs}
      onClick={() => {
        setActive(props.target);
      }}
      className={classNames(
        'sm:text-sm text-xs py-2 block leading-normal font-poppins hover:text-primary font-normal whitespace-nowrap cursor-pointer px-4',
        {
          'lg:border-r-2 px-3 border-transparent': !isActive && vertical,
          'text-primary-foreground ': !isActive && vertical && !vertical,
          // 'border-b bg-transparent px-4 border-border-foreground': !vertical,
          'md:px-8 px-3': !vertical,
          'text-primary border-b-2 border-primary ': isActive && !vertical,
          'text-primary bg-primary-tab dark:bg-background-opacity border-primary px-3 lg:border-r-2 lg:border-b-0 border-b-2':
            isActive && vertical,
          'px-4': vertical
        },
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

interface TabContentProps {
  className?: string;
  children: React.ReactNode;
}

export function TabContent(props: TabContentProps): JSX.Element {
  const { vertical } = useContext(TabsContext);

  const attrs = {
    ...props,
    className: classNames(props.className, {
      'px-3 py-2 flex-auto w-full': vertical,
      'pt-3 w-full': !vertical
    })
  };

  return <div {...attrs}>{props.children}</div>;
}

interface TabPaneProps {
  id: string;
  opened?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function TabPane(props: TabPaneProps): JSX.Element {
  const { active, setActive } = useContext(TabsContext);

  if (props.opened && !active) {
    setActive(props.id);
  }

  const attrs = {
    ...props,
    className: classNames({
      'sm:hidden hidden md:hidden lg:hidden': props.id !== active
    })
  };

  return <div {...attrs}>{props.children}</div>;
}
