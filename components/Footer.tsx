import { FaCode } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <>
      <div className="mt-10 flex flex-col gap-6 border-t py-5 select-none">
        <div className="justify-center text-center flex">
          <h1 className="text-xl md:text-2xl flex gap-2 items-center font-poppins font-semibold">
            <FaCode className="text-orange-500" />
            PrepVault
          </h1>
        </div>

        <div className="flex md:flex-row justify-center gap-6">
          <ul className="flex flex-col  text-center justify-center gap-2 ">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>

          <div className="flex flex-col justify-center text-center gap-2">
            <h1 className="font-semibold font-poppins">Social Links</h1>
            <div className="flex gap-4 justify-center">
              <Link target="blank" href="https://x.com/sidhantkumar_08">
                <FaXTwitter size={20} />
              </Link>
              <Link target="blank" href="https://github.com/sidhant-kumar08">
                <FaGithub size={20} />
              </Link>
              <Link target="blank" href="https://www.linkedin.com/in/sidhant08">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center flex flex-col">
          © 2025 PrepVault. All rights reserved.
        </div>
        <div className="text-center font-poppins font-semibold">
          Made with ❤️ by Sidhant
        </div>
      </div>
    </>
  );
}

export default Footer;
