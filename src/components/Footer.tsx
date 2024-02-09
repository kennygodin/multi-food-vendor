import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Container from './Container';
import { FaSquareXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <Container>
      <div className="max-w-6xl mx-auto p-5 mt-20 mb-5 bg-neutral-200 flex items-center justify-around text-sm">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Follow us</span>
          <div>
            <span className="flex gap-1 items-center">
              <FaFacebook />
              Facebook
            </span>
            <span className="flex gap-1 items-center">
              <FaInstagram /> Instagram
            </span>
            <span className="flex gap-1 items-center">
              <FaSquareXTwitter />
              Twitter
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Contact us</span>
          <div className="flex flex-col gap-1">
            <span>Email: support@foodtroops.com</span>
            <span>Phone: +234 816 5919 025</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Explore More</span>
          <div className="flex flex-col gap-1">
            <span>About us</span>
            <span>Term of service</span>
            <span>Privacy policy</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
