import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Filter from '../components/Filter'

import HeroImg from '../assets/hero.png'
import SellOrRent from '../assets/sellorrent.png'

import '../styles/pages/LandingPage.scss'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div id="landing-page">
      <Header />

      <div className="hero">
        <div className="texts">
          <h1>
            Your <br />
            perfect <span>home</span>
          </h1>
          <h2>is out there</h2>

          <p>
            Sonnenlicht is a convenient and trustworthy source of homes and
            appartments for sale or rent. We are the first in Düsseldorf to have
            a goal to make people's lives confortable and affordable, with
            efficient comunications.
          </p>

          <button onClick={() => navigate('/signin')}>Get started</button>
        </div>
        <img src={HeroImg} alt="Hero" />
      </div>

      <Filter />

      <div className="sell-or-rent">
        <img src={SellOrRent} alt="Hero" />

        <div className="texts">
          <h2>
            Want to rent or sell your <span>house?</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
            viverra feugiat quam convallis hendrerit nam porttitor urna non.
            Venenatis, dignissim sit quis libero. Justo, lorem neque, massa,
            ornare ut. Ullamcorper euismod nunc et pellentesque diam. Urna nunc
            tempor, tristique a, fermentum imperdiet lorem. Tortor nec egestas
            sit nunc. Ut sagittis magna lacus, id lorem malesuada. Vulputate a
            dolor interdum morbi sem porta suspendisse.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export { LandingPage }
