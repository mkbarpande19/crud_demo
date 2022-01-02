import React from 'react'
import htmlImg from "../images/html.png"
import cssImg from "../images/css.png"
import firebaseImg from "../images/firebase.png"
import jsImg from "../images/js.png"
import reactImg from "../images/react.png"
import './About.css';


const About = () => {
    return (
        <div>
            <h3>CONTACT APP</h3>
            <div>
                <section>
                    <h4>This React App is created using</h4>
                    <div className='techWrapper'>
                        <div className='techDetails'>
                            <img style={{width:"256px", height:"256px"}} src={htmlImg} alt="html"/>
                            <span>HTML</span>
                        </div>

                        <div className='techDetails'>
                            <img style={{width:"256px", height:"256px"}} src={cssImg} alt="html"/>
                            <span>CSS</span>                        
                        </div>

                        <div className='techDetails'>
                            <img style={{width:"256px", height:"256px"}} src={jsImg} alt="html"/>
                            <span>javascript</span>
                        </div>

                        <div className='techDetails'>
                            <img style={{width:"256px", height:"256px"}} src={reactImg} alt="html"/>
                            <span>React js</span>
                        </div>

                        <div className='techDetails'>
                            <img style={{width:"256px", height:"256px"}} src={firebaseImg} alt="html"/>
                            <span>Firebase</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default About
