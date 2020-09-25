import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/ext-language_tools"

const TextEditor = () => {

function onChange(newValue: any) {
  console.log("change", newValue);
}

return(
  <AceEditor
    mode="yaml"
    fontSize={18}
    theme="gruvbox"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true
    }}
  />)
};

export default TextEditor
