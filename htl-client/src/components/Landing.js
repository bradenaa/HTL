import React from 'react';
import '../landing.css';
import amaranta from '../images/Amaranta.png'
import coffee from '../images/coffee-cup.png'
import discover1 from '../images/discover_1.png'
import discover2 from '../images/discover_2.png'
import discover3 from '../images/discover_3.png'
import email from '../images/Email.png'
import fireworks from '../images/fireworks.png'
import mateo from '../images/Mateo.png'
import support from '../images/support.png'
import { Link } from 'react-router-dom';

const Landing = ({ currentUser }) => {
  return (
    <div className="Landing">

      <div className="main-column">

        {/* ====================== */}
        {/* ===== PAGE ONE ======= */}
        {/* ====================== */}

        <div className="row row1">
          <div className="front_page_content">
            <div className="row1_top">
              <p>Practice your second language with locals in Los Angeles!</p>
            </div>
            <div className="row1_middle">
              <p>Get FREE membership for a year if you sign up now!</p>
            </div>
            <div className="row1_bottom">
              <button>
                <a href="https://hashtaglanguage.typeform.com/to/n4QlYc" id="first_link">Join our waitlist</a>
              </button>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* ===== PAGE TWO ======= */}
        {/* ====================== */}
        <div className="row row2">

          <div className="top">
            <div className="heading">
              <p>Make learning a new language a lifestyle.</p>
            </div>
          </div>

          <div className="bottom">
            <div className="col col1">
              <div className="MLW_col_top">
                <img src={fireworks} alt="" />
              </div>
              <p className="line1">
                Make it an experience
              </p>
              <p className="line2">
                Learning a new language takes time, but you should enjoy the adventure to fluency!
              </p>
            </div>
            <div className="col col2">
              <div className="MLW_col_top">
                <img src={support} alt="" />
              </div>
              <p className="line1">
                Meet friends from around the world
              </p>
              <p className="line2">
                Get connected online and offline with locals that speak your target language!
              </p>
            </div>
            <div className="col col3">
              <div className="MLW_col_top">
                <img src={coffee} alt="" />
              </div>
              <p className="line1">
                Learn how you would like to
              </p>
              <p className="line2">
                Learn your second language by using it with our community over coffee, at a bar, or on a hike!
              </p>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* ===== PAGE THREE ===== */}
        {/* ====================== */}

        <div className="row row3">
          <div className="left">
            <p>Langauge creates stories...</p>
            <button id="hide">
              <a href="https://hashtaglanguage.typeform.com/to/n4QlYc" id="second_link">Join our waitlist</a>
            </button>
          </div>
          <div className="right">
            <div className="container">

              <div className="heading">
                <p>Matt's first exchange in Los Angeles!</p>
              </div>

              <div className="center">
                <div className="image_container">
                  <img src={mateo} alt="" />
                  <p className="name">Matt</p>
                </div>
                <div className="icon">
                  <i className="fas fa-retweet fa-2x"></i>
                </div>
                <div className="icon" id="mobile_icon">
                  <i className="fas fa-retweet fa-sm"></i>
                </div>
                <div className="image_container">
                  <img src={amaranta} alt="" />
                  <p className="name">Amaranta</p>
                </div>
              </div>

              <div className="bottom_text">
                <p>
                  <span className="bold">Learning Spanish</span> with Amaranta was awesome! I thought she would only want to practice <span className="bold">conversational English</span> while she was in <span className="bold">Los Angeles</span>, but instead was just trying to <span className="bold">meet locals</span>. She helped with practice my <span className="bold">Spanish over some tacos</span> and margaritas in Downtown. Such a good time- can’t wait to visit her in Buenos Aires!
                </p>
              </div>

            </div>

            <div className="row3_bottom_hidden_button">
              <button>
                <a href="https://hashtaglanguage.typeform.com/to/n4QlYc" id="third_link">Join our waitlist</a>
              </button>
            </div>

          </div>
        </div>

        {/* ====================== */}
        {/* ===== PAGE FOUR ====== */}
        {/* ====================== */}

        <div className="row row4">

          <div className="top">
            <div className="heading">
              <p>Here's how it works</p>
            </div>
          </div>

          <div className="bottom">
            <div className="col col1">
              <div className="HIW_col_top" id="hide">
                <button>
                  <a href="https://hashtaglanguage.typeform.com/to/n4QlYc" id="fourth_link">Join our waitlist</a>
                </button>
              </div>
              <div className="line1">
                <p>Join</p>
              </div>
              <div className="line2">
                <p>
                  Get connected to locals in our community that speak your target language by attending or creating exchanges that fit your style.
                </p>
              </div>
            </div>
            <div className="col col2">
              <div className="HIW_col_top" id="screen_container">
                <img src={discover1} alt="" className="screen_images" />
                <img src={discover2} alt="" className="screen_images" id="second_image" />
                <img src={discover3} alt="" className="screen_images" id="third_image" />
              </div>
              <div className="line1" id="first">
                <p>Discover</p>
              </div>
              <div className="line2">
                <p>
                  Once you join our global community of language learners from  20+ different countries, find an exchange that works for you!
                </p>
              </div>
            </div>
            <div className="col col3">
              <div className="HIW_col_top" id="hide">
                <img src={email} alt="" />
              </div>
              <div className="line1">
                <p>Practice</p>
              </div>
              <div className="line2">
                <p>
                  Learn your second language by using it with fluent or native speakers over coffee, at a bar, or even on a hike!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* ===== PAGE FIVE ====== */}
        {/* ====================== */}

        <div className="row row5">
          <div className="bottom_page_content">
            <div className="row5_top">
              <p>
                Ready to practice Spanish while eating some tacos?
              </p>
            </div>
            <div className="row5_bottom">
              <button>
                <a href="https://hashtaglanguage.typeform.com/to/n4QlYc" id="fifth_link">Join our waitlist</a>
              </button>
            </div>
          </div>
        </div>

        {/* ====================== */}
        {/* ===== PAGE FOOTER ==== */}
        {/* ====================== */}

        <footer className="footer">
          <Link className="footerLink" to="/FAQ">FAQ</Link>
          <Link className="footerLink" to="/FAQ">Safety</Link>
          <Link className="footerLink" to="/FAQ">Code of Conduct</Link>
        </footer>

      </div>

    </div>
  )
}

export default Landing;
