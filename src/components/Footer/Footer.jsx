import React from 'react'
import "./style.scss"
import {
  FaGithub,
  FaGooglePlay,
  FaGoogle,
  FaInstagramSquare,
  FaLinkedin,
  FaFacebookSquare
} from "react-icons/fa";
import ContentWrapper from '../contentWrapper/ContentWrapper';



const Footer = () => {
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tempora consequatur accusantium minus? Enim dignissimos amet eos facere laudantium,
          iste ratione architecto, sed magnam itaque, temporibus numquam. Non quam distinctio laborum corrupti
          iusto a quia minus nostrum animi!
        </div>
        <div className='specialIcons'>
          <span className="icon">
            <FaFacebookSquare />
          </span>
          <span className="icon">
            <FaGithub />
          </span>
          <span className="icon">
            <FaGooglePlay />
          </span>
          <span className="icon">
            <FaGoogle />
          </span>
          <span className="icon">
            <FaInstagramSquare />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>

        </div>
      </ContentWrapper>

    </footer>
  )
}

export default Footer
