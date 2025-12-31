import "../styles/footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1 */}
        <div className="footer-column about">
          <img src={logo} alt="Brains Logo" className="footer-logo" />
          <div className="footer-text">
            <h3>Brains Studies Institute</h3>
            <p>
              Empowering innovation and creativity through technology and
              education.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-column links">
          <h4>Quick Links</h4>
          <ul className="horizontal-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/menu">Programs</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Brains Institute — All Rights Reserved For Jawad Deeb</p>
      </div>
    </footer>
  );
};

export default Footer;
