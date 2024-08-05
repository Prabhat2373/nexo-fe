import { useEffect, useRef, useState } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';

import Code from '@tiptap/extension-code';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import ImageResize from 'tiptap-extension-resize-image';

import {
  TableOfContents,
  getHierarchicalIndexes,
  getLinearIndexes
} from '@tiptap-pro/extension-table-of-contents';

// import UniqueID from '@tiptap-pro/extension-unique-id'
// import UniqueId from "tiptap-unique-id";
import UniqueID from '@tiptap-pro/extension-unique-id';
import classNames from 'classnames';
import ErrorText from '../error-text';
import MenuBar from './MenuBar';
import { ToC } from './ToC';

interface IRichTextEditorProps {
  name?: string;
  label?: string;
  output?: 'json' | 'html';
  withoutForceTitle?: boolean;
  placeholder?: string;
}

const RichTextEditor = (props: IRichTextEditorProps) => {
  const {
    name,
    label,
    error,
    disabled,
    required,
    ellipsis,
    onChange = () => {},
    value,
    toolbar = {},
    tableResize = false,
    children,
    output,
    withoutForceTitle,
    placeholder
  } = props;
  const readOnly = props?.readOnly;

  const CustomDocument = Document.extend({
    content: 'heading block*'
  });

  const [items, setItems] = useState([]);

  const extensions = [
    Code.configure({
      HTMLAttributes: {
        class: 'my-custom-class'
      }
    }),
    StarterKit.configure({
      document: false
    }),
    CustomDocument,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Highlight,
    // Text,
    TextStyle,
    Color,
    Document,
    Table.configure({
      resizable: tableResize
    }),
    ImageResize,
    Image.configure({
      allowBase64: true,
      inline: true
    }),
    TableCell,
    TableHeader,
    TableRow,
    Placeholder.configure({
      placeholder: ({ node }) => {
        console.log('node', node);
        if (node.type.name === 'heading' && !withoutForceTitle) {
          return 'What’s the title?';
        }

        return placeholder || 'Can you add some further context?';
      }
    }),
    UniqueID.configure({
      types: ['heading']
    }),
    // TableOfContents.configure({
    //   anchorTypes: ["heading", "customAnchorType"],
    // }),
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      anchorTypes: ['heading'],
      onUpdate(content) {
        console.log('toccontent', content);
        setItems(content);
      }
    })
  ];

  const contentRef = useRef(value);

  const [border, setBorder] = useState('');
  const handleInput = (style) => {
    if (error && !disabled) {
      setBorder('error');
    } else {
      setBorder(style);
    }
  };

  useEffect(() => {
    if (disabled) {
      setBorder('');
    }
  }, []);

  useEffect(() => {
    handleInput('');
  }, [error]);
  const editor = useEditor({
    editable: !readOnly,

    extensions: extensions,

    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-48 p-4'
      }
    },
    content: contentRef.current,

    onUpdate: ({ editor }) => {
      if (output === 'json') {
        onChange(editor?.getJSON());
      } else if (output === 'html') {
        onChange(editor?.getHTML());
      } else {
        onChange(editor?.getJSON());
      }
    }
  });

  // const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor && !withoutForceTitle) {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    }
  }, [editor]);
  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        className={classNames('input-rich-container rich-editor  ', {
          'col-span-12': !readOnly,
          'col-span-9': readOnly
        })}
      >
        <fieldset
          className={classNames({
            'border rounded-md': !readOnly
          })}
          onFocusCapture={() => handleInput('active')}
          onBlur={() => handleInput('')}
        >
          {label && (
            <legend>
              {/* <FormLabel
              disabled={disabled}
              label={label}
              required={required}
              ellipsis={ellipsis}
            /> */}
              <label>{label}</label>
            </legend>
          )}

          <MenuBar editor={editor} readOnly={readOnly} value={value} />
          {children}
          <EditorContent editor={editor} content={contentRef.target} />
        </fieldset>
        {!disabled && error && <ErrorText error={error} />}
      </div>
      <div
        className={classNames({
          'col-span-3 ': readOnly,
          hidden: !readOnly
        })}
      >
        <div className="sticky top-0">
          {readOnly ? <ToC items={items} editor={editor} /> : null}
        </div>
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  ellipsis: PropTypes.bool,
  value: PropTypes.string
};

RichTextEditor.defaultProps = {
  error: '',
  disabled: false,
  required: false,
  ellipsis: false,
  value: ''
};

export default RichTextEditor;
