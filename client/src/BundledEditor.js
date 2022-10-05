import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/emoticons/js/emojis';

// eslint-disable-next-line import/no-webpack-loader-syntax
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';

const EditorInit = (props) => {
  const {init, ...rest} = props;
  return (
    <Editor
      init={{
        ...init,
        skin: false,
        content_css: false,
        content_style: [contentCss, contentUiCss, init.content_style || ''].join('\n'),
      }}
      {...rest}
    />
  );
}
const BundledEditor = (props) => {
  return <EditorInit
    onInit={(evt, editor) => props.editorRef.current = editor}
    initialValue='<p>This is the initial content of the editor.</p>'
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
        'searchreplace', 'table', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
  />
}
export default BundledEditor;