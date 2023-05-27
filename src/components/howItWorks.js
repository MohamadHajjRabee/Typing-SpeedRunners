import React from "react";
import start from "./start.png";
import typing from "./typing.png";
import result from "./result.png";
import improve from "./improve.png";
function HowItWorks(){
    return(
        <div className="bg-gradient-to-br from-[rgba(220,220,220,255)] to-[rgb(235,235,235)] p-5 pb-0 leading-relaxed" id="howItWorks">
            <h1 className="text-center text-3xl my-16 font-bold ">How It Works</h1>
            <div className="flex justify-center content-center gap-12 container m-auto flex-wrap">
                <Item num="1" img={start} header="Get Started" content="Welcome to Typing Speedrunners, a website designed to help you measure and improve your typing speed and accuracy. Select a timer duration for your typing test (30 seconds, 1 minute, 3 minutes, or 5 minutes) and get ready to type interesting content fetched from a random quote API." />
                <Item num="2" img={typing} header="Start Typing" content="The test begins as soon as you start typing. As you type, your Words Per Minute (WPM) and Characters Per Minute (CPM) will be displayed live on the screen, allowing you to track your performance in real-time." />
                <Item num="3" img={result} header="Results" content="At the end of the test, your final WPM and CPM scores will be displayed. Use these metrics to gauge your typing proficiency and set goals for improvement." />
                <Item num="4" img={improve} header="Practice and Improve" content="The key to becoming a faster and more accurate typist is practice. With Typing SpeedRunners, you can take as many tests as you like, experimenting with different timer durations and challenging yourself with new quotes each time." />
            </div>
        </div>
    )
}
function Item(props){
    return (
        <div className="w-64  border-4 rounded-2xl border-[#99BBFF] p-8 box-content">
            <img className="m-auto" src={props.img} />
            <h1 className="font-medium text-center mb-5 border-b-4 border-black text-black py-2 text-xl">{props.header}</h1>
            <p>{props.content}</p>
        </div>
    )
}

//<p>We hope you enjoy using Typing SpeedRunners and find it helpful in improving your typing skills. Good luck, and happy typing!</p>
export default HowItWorks;