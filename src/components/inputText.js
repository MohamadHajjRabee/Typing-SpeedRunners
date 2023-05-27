import react from "react"
import React from "react";

function inputText(){
    return <input type="text" onClick={() => setIsRunning(true)} onKeyUp={e => e.target.selectionStart= inputText.length + 1} onChange={updateInput} onPaste={(e) => e.preventDefault()} value={inputText} maxLength={text.length} autoComplete="off"
                  autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
}

export default inputText