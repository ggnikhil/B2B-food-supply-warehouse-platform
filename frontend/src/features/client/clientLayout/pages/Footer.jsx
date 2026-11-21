import React from "react";
import { LuPhoneCall, LuMail } from "react-icons/lu";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import "../style/footer.scss";

// Dummy data, baad me real data/links se replace karna
const knowMore = [
  { label: "Blog", href: "#" },
  { label: "Corporate Announcements", href: "#" },
  { label: "Governance", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms of use", href: "#" },
  { label: "Supplier Code of Conduct", href: "#" },
];

const socials = [
  { label: "LinkedIn", href: "#", icon: <FaLinkedinIn /> },
  { label: "Instagram", href: "#", icon: <FaInstagram /> },
  { label: "YouTube", href: "#", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h4>Company</h4>
          <p className="footer__name">SupplyX Private Limited</p>
          <p className="footer__muted">
            Dummy Address, Sector 00, Mumbai, Maharashtra - 400000
          </p>
          <p className="footer__muted">CIN: U00000MH0000PTC000000</p>
          <a href="tel:0000000000" className="footer__contact">
            <LuPhoneCall /> 000-00000000
          </a>
          <a href="mailto:help@supplyx.com" className="footer__contact footer__contact--mail">
            <LuMail /> help@supplyx.com
          </a>
        </div>

        <div className="footer__col">
          <h4>Know More</h4>
          <ul>
            {knowMore.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Follow us on</h4>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col footer__brand">
          <a href="/" className="footer__logo">
            supply<span>X</span>
          </a>
          
          <div className="footer__stores">
            <a href="#" aria-label="Get it on Google Play">
              <img src="/getinonplaysotire.png" alt="Get it on Google Play" />
            </a>
            <a href="#" aria-label="Download on the App Store">
              <img src="/app-store.svg" alt="Download on the App Store" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;