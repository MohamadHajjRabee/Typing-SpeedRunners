import React, {useEffect, useRef, useState} from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function Content(){
    // const [inputText, setInputText] = useState("")
    const [time, setTime] = useState(60)
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(0);
    let [originTime, setOriginTime] = useState(60);
    const [text, setText] = useState("")
    const [stopFetching, setStopFetching] = useState(false);
    const inputRef = useRef(null);
    const wrongCharacters = useRef(0)
    const [score, setScore] = useState(0)
    const [enableTyping, setEnableTyping] = useState(false)
    const [fetchedText, setFetchedText] = useState("");
    const [textLength, setTextLength] = useState(60)
    const [characters, setCharacters] = useState(0)
    function updateInput(event){
        if(!isRunning){
            setIsRunning(true);
            setTime(time - 1)
        }
        const value = event.target.innerText + event.data;
        if (event.data === text.charAt(0) && wrongCharacters.current === 0) {
            event.preventDefault();
            event.target.innerHTML = value;
            inputRef.current.value = value;
            setCharacters(value.length)
            setText(prevState => prevState.substring(1));
            if(text.length === 1){
                inputRef.current.blur();
                setIsRunning(false)
                setEnableTyping(false)
                clearInterval(intervalRef.current)
                intervalRef.current = 0;
                calculateScore()
            }
        }else{
            event.preventDefault()
            wrongCharacters.current = wrongCharacters.current + 1;
            event.target.innerHTML = value.substring(0, value.length - wrongCharacters.current) + "<span id='striked' class='text-red-700'>" + value.substring(value.length - wrongCharacters.current, value.length) + "</span>";
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(event.target);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function calculateScore(){
        if(inputRef.current.value){
            //const words = inputRef.current.value.trim().split(/\s+/).length;
            const words = inputRef.current.value.length;
            const elapsedTime = originTime - time;
            const finalScore = Math.floor((words / 5) / (elapsedTime / 60));
            setScore(finalScore)
        }
    }

    function updateTime(event){
        if(!isRunning){
            clearInterval(intervalRef.current)
            const value = event.target.value;
            setTime(value)
            setOriginTime(value)
            setTextLength(value)
            setStopFetching(false)
            setFetchedText("")
            setText("")
            wrongCharacters.current = 0;
            inputRef.current.value = "";
            inputRef.current.innerHTML = "";
        }
    }

    useEffect(() => {
        if (isRunning && time > 0 && intervalRef.current === 0) {
            intervalRef.current = setInterval(() => {
                setTime(prevState => prevState - 1)
            }, 1000)
        } else if (time === 0) {
            setEnableTyping(false)
            setIsRunning(false)
            clearInterval(intervalRef.current)
            intervalRef.current = 0;
            inputRef.current.blur();
        }
        calculateScore();
    }, [calculateScore, isRunning, time])

    const fetchText = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random?minLength=100');
            const data =  await response.json();
            const textData = data['content'];
            setFetchedText(prevState => prevState.length === 0 ? textData : prevState + " " + textData)
        }catch (error){
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        if(fetchedText.length < 250 * (textLength / 60) && !stopFetching){
            fetchText();
        }else{
            setStopFetching(true)
            setText(fetchedText)
            setEnableTyping(true)
        }
    }, [fetchedText, stopFetching, textLength]);

    return (
        <>
            <div className="input-div container flex flex-col justify-evenly min-h-[calc(100vh-64px)]  mx-auto 2xl:max-w-screen-lg xl:max-w-screen-lg">
                <TextBox inputRef={inputRef} updateInput={updateInput} wrongCharacters={wrongCharacters} time={time} enableTyping={enableTyping} text={text} score={score} stopFetching={stopFetching} characters={characters}/>
                <div className="flex justify-center text-slate-50 my-3">
                    <Button value="30" click={updateTime} text="30 Seconds" />
                    <Button value="60" click={updateTime} text="1 Minute" />
                    <Button value="180" click={updateTime} text="3 Minute" />
                    <Button value="300" click={updateTime} text="5 Minute" />
                </div>
                <span></span>
            </div>
        </>
    )
}

function Button(props){
    return <button className="transition bg-gradient-to-br from-gray-100 to-gray-300 text-black font-medium hover:scale-105 hover:bg-black active:bg-blue-700 rounded p-1.5 mx-2" type="submit" value={props.value} onClick={props.click}>{props.text}</button>
}

function TextBox(props){
    return <>
        <div className="text-and-input px-5 py-5 tracking-widest bg-gray-500 text-slate-50 md:text-lg font-medium rounded-md cursor-pointer" onClick={() => props.time !== 0 ? props.inputRef.current.focus() : null}>

            <div className="input-text"><div className="user-input text-slate-400"
                                             tabIndex="1"
                                             suppressContentEditableWarning={true}
                                             ref={props.inputRef}
                                             onKeyDown={e => e.key === "Backspace" ? props.wrongCharacters.current > 0 ? props.wrongCharacters.current = props.wrongCharacters.current - 1 : e.preventDefault() : e.ctrlKey ? e.preventDefault() : null}
                                             onBeforeInput={props.updateInput}
                                             contentEditable={props.enableTyping}
            ></div>

                {props.stopFetching ? <><span className="first-letter">{props.text[0]}</span>{props.text.slice(1)}</> : <SkeletonTheme baseColor="#F8FAFC" highlightColor="#94A3B8"><Skeleton count={8}/></SkeletonTheme>}
            </div>
            <div className="text-center flex justify-evenly m-5">
                <span>Time: {props.time}</span>
                <span>WPM: {props.score}</span>
                <span>CPM: {props.score * 5}</span>
                <span>Characters: {props.characters}</span>
            </div>
        </div>
    </>
}
export default Content;