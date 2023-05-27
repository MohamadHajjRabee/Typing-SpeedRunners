import React, {useRef} from "react"

function Navbar(){
    const menu = useRef(null);
    function toggleMenu(){
        menu.current.classList.toggle('hidden');
    }



    return (
        <nav className="border-gray-200">
            <div className="max-w-screen-2xl font-medium text-slate-50 flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <button type="button" onClick={toggleMenu} className="inline-flex items-center p-2 ml-3 text-sm rounded-lg text-gray-100 md:hidden hover:text-gray-300 focus:outline-none active:text-gray-50">
                    <span className="sr-only">Open main menu</span>
                    <i className="fa-solid fa-bars fa-2xl"></i>
                </button>
                <div className="hidden w-full md:block md:w-auto" ref={menu}>
                    <Ul>
                        <Li content="Play" to="play"/>
                        <Li content="How it works?" to="howItWorks"/>
                        <Li content="FAQs" to="FAQs"/>
                        <Li content="About" to="about"/>
                    </Ul>
                </div>

            </div>
        </nav>
    )
}

/*
    TODO: Animate the Header title so that it's animated by a random speed.
 */
function Logo(){
    return <a href="#"><span className="text-2xl">Typing SpeedRunners</span></a>

}
function Ul({children}){
    return (
        <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {children}
        </ul>
    )
}
function Li(props){
    return <li><a href={'#' + props.to} className="block py-2 pl-3 pr-4 rounded hover:bg-gray-500 md:hover:text-gray-300 md:hover:bg-transparent md:border-0 md:p-0">{props.content}</a></li>
}
export default Navbar;