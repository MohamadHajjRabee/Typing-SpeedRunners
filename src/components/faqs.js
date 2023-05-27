import React from "react";
import background from "./background.jpg"
function Faqs(){
    return (
        <>
            <img src={background} alt="background" className="select-none"/>
            <div className="bg-[#151515] flex flex-wrap flex-row justify-center content-center gap-12 text-slate-50 pt-20 pb-28 px-3" id="FAQs">
                <Item question="What is the purpose of this website?" answer="The purpose of this website is to help users measure and improve their typing speed through a series of typing tests and exercises." />
                <Item question="What is the average typing speed?" answer="The average typing speed for a typical adult is around 40 to 50 words per minute (WPM). However, it can vary significantly based on factors such as experience, practice, and familiarity with the keyboard." />
                <Item question="How are the Quotes From the Test Chosen?" answer="Quotes are fetched randomly from quotable.io API." />
                <Item question="How do you increase your typing speed?" answer="To increase your typing speed, it's essential to develop proper positioning, utilize all your fingers efficiently, type accurately without relying on looking at the keyboard, and minimize errors. If any of these aspects are lacking, engaging in a typing training program can greatly help in honing your skills." />
                <Item question="How is typing speed measured?" answer="Typing speed is determined by calculating the number of words you can type correctly in a set amount of time. In typing tests, both Words Per Minute (WPM) and Characters Per Minute (CPM) are used as metrics. Each 'word' is considered as five keystrokes. By assessing your performance, you will receive an average score for WPM and CPM, giving you an indication of your typing speed." />
            </div>
        </>
    );
}

function Item(props){
    return (
        <div className="md:w-1/2">
            <h1 className="text-3xl text-slate-50">{props.question}</h1>
            <p>{props.answer}</p>
        </div>
    )
}

export default Faqs;