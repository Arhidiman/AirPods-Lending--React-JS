import react, { Children, useEffect, useRef, useState}  from 'react'
import './HeaderStyle.css';
import logo from '../images/logo.png'
import bag from '../images/bag.png'
import triangles from '../images/triangles.png'
import Animation from '../10.1Animation/Animation'
import ScrollingNavigation from '../10.3ScrollingNavigation/ScrollingNavigation'
import FadeAnimation from '../10.5FadeAnimation/FadeAnimation';

function Header(props) {

    const transition = useRef(0);
    const currentTransition = useRef(0);
    const isScrollTo = useRef(true);
    const [transitionStep, setTransitionStep] = useState(10);
    const menuLines = useRef();
    const menuWidth = useRef(0);
    const menuCurrentTransition = useRef(0);
    const isMenuAnimatingLeft = useRef(false);
    const isMenuAnimatingRight = useRef(false);
    const menuAnimation = useRef(null);
    const isMenuActive = useRef(false);

    
    useEffect(()=>{
        props.setSideMenuButton(menuLines.current)
    })

    function getPixelsNumber(pixels) {
        return(Number(pixels.substring(0, pixels.length - 2)));
    }

    function animateSideMenu() {
        props.sideMenu.style.display = 'grid';
        props.sideMenuBackground.classList.remove('fade');
        props.sideMenuBackground.style.display = 'block';
        isMenuAnimatingLeft.current = !isMenuAnimatingLeft.current;
        menuWidth.current = getPixelsNumber(getComputedStyle(props.sideMenu).width)
        menuCurrentTransition.current = 0;
        menuAnimation.current = setInterval(()=>{
            if(isMenuAnimatingLeft.current == true) {
                menuCurrentTransition.current = menuCurrentTransition.current + transitionStep;
                props.sideMenu.style.marginLeft = (getPixelsNumber(getComputedStyle(props.sideMenu).marginLeft) - transitionStep) + 'px';
                if(menuCurrentTransition.current >= (menuWidth.current - transitionStep)) {
                    clearInterval(menuAnimation.current);
                    isMenuAnimatingLeft.current = false;
                    isMenuActive.current = true;
                }
            }
            if(isMenuAnimatingRight.current == true) {
                props.sideMenuBackground.classList.add('fade');
                menuCurrentTransition.current = menuCurrentTransition.current - transitionStep;
                props.sideMenu.style.marginLeft = (getPixelsNumber(getComputedStyle(props.sideMenu).marginLeft) + transitionStep) + 'px';
                if(menuCurrentTransition.current <= 0) {
                    clearInterval(menuAnimation.current);
                    isMenuAnimatingRight.current = false;
                    isMenuActive.current = false;
                    props.sideMenuBackground.style.display = 'none';
                }
            }
        },15)
    }

    function closeMenu() {
        props.sideMenuBackground.classList.add('fade');
        isMenuAnimatingRight.current = true;
        menuAnimation.current = setInterval(()=>{
            if( isMenuActive.current = true) {
                menuCurrentTransition.current = menuCurrentTransition.current - transitionStep;
                props.sideMenu.style.marginLeft = (getPixelsNumber(getComputedStyle(props.sideMenu).marginLeft) + transitionStep) + 'px';
                if(menuCurrentTransition.current <= 0) {
                    clearInterval(menuAnimation.current);
                    isMenuAnimatingRight.current = false;
                    isMenuActive.current = false;
                    props.sideMenuBackground.style.display = 'none';
                }
            }
        },15)
    }

    return (
        <header id="header" className = "header"> 
                <div className="container header-container">
                    <div className='header-bar'>
                        <div class="logo-apple" alt="??????????????" style = {{backgroundImage: `url(${logo})`}}> </div>
                        <nav >
                            <ul className = 'navigation header-navigation'>
                                <ScrollingNavigation scrollToElementId = 'header'><a href='#' name='header'>??????????????</a></ScrollingNavigation>
                                <ScrollingNavigation scrollToElementId = 'SecondSection'><a href='#' name='SecondSection'>????????????????????????</a></ScrollingNavigation>
                                <ScrollingNavigation scrollToElementId = 'SixthSection'><a href='#' name='SixthSection'>????????????????????</a></ScrollingNavigation>
                                <ScrollingNavigation scrollToElementId = 'SeventhSection'><a href='#' name='SeventhSection'>????????????????</a></ScrollingNavigation>
                                <ScrollingNavigation scrollToElementId = 'EighthSection'><a href='#' name='EighthSection'>????????????</a></ScrollingNavigation>
                            </ul>
                        </nav>
                        <div class="logo-bag" alt="??????????????" style = {{backgroundImage: `url(${bag})`}}> </div>
                        <div ref = {menuLines} id = 'menu-lines' className='menu-lines'>
                            <span className='line line1'></span>
                            <span className='line line2'></span>
                            <span className='line line3'></span>
                        </div>
                    </div>
                    <div className='image-triangles' style = {{backgroundImage: `url(${triangles})`}}>
                    </div>
                  
                    <div class="header-text">
                        {/* <FadeAnimation delay = {20}> */}
                        <h1 class="intro-title ">
                            AirPods 
                            2 ??????????????????
                        </h1>
                        {/* </FadeAnimation> */}
                        <p class="intro-text">
                            ???????????? ??????????????????????, ???????????????????????? ????????<br></br>
                            ?? ???????????????????????? ???????????????????????? ???????????? - <br></br> 
                            ?????? ?????? AirPods
                        </p>
                         {/* <FadeAnimation delay = {20}> */}
                        <a class="intro-btn" id = 'intro-btn' position = {0}>
                            ???????????????? ????????????
                        </a>
                         {/* </FadeAnimation> */}
                        
                    </div>
                   
                </div>
        </header>
    );
}

export default Header;
