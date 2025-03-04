import './Footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <footer>
                <div className="footer-logo">
                    <a href="https://www.cnjg.org/file/coronaviruspng-0">
                        <img src="https://www.cnjg.org/sites/default/files/coronavirus_0.png" alt="corova virus pic" />
                    </a>
                </div>
                <div className="footer-dependency">
                    <p> Dependencies </p>
                    <a href="https://disease.sh/">  Covid data </a>
                    <a href="https://www.cnjg.org/file/coronaviruspng-0"> Coronavirus Image </a>
                    <a href="https://www.eu-cord.org/2020/04/covid-19/"> Background image </a>
                    <a href="https://react-leaflet.js.org/"> React-leaflet</a>
                </div>
                <div className="footer-contact">
                    <p> Follow </p>
                    <a href="https://www.instagram.com">  Instagram </a>
                    <a href="https://www.twitter.com"> Twitter </a>
                    <a href="https://www.linkedin.com"> LinkedIn </a>
                </div>

                <div className="footer-optional"></div>
            </footer>
            <p className="copyright"> Created by: <a href='https://anoopraju.xyz'>Anoop Raju</a> 2021 </p>
        </div>
    )
}

export default Footer
