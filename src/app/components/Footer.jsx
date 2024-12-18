"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/app/utils/auth";

export function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // ใช้ router เพื่อ navigation

  useEffect(() => {
    const checkToken = () => {
      const decoded = decodeToken();
      if (decoded) {
        console.log("Token decoded:", decoded);
        setIsAuthenticated(true);
      } else {
        console.log("No valid token");
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-[#2A2F6E] pt-6 pb-6 font-happy text-2xl">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Company Info Section */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl text-orange-500">TurboBids</span>
          </Link>
          <div className="text-white space-y-4">
            <h3 className="text-2xl">TurboBids Co.,Ltd</h3>
            <p className="text-xl">
              193-195 Lake Rajada Office Complex,
              <br />
              Ratchadapisek Road, Khlong Toei, Bangkok
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="tel:02-222-2222"
              className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-full"
            >
              <span>02-222-2222</span>
            </Link>
            <Link
              href="https://line.me/@TurboBids.official"
              className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full"
            >
              <span>@TurboBids.official</span>
            </Link>
          </div>
        </div>

        {/* Services Links Section */}
        <div>
          <div>
            <h2 className="text-3xl text-orange-500 mb-2">Our Services!</h2>
            <ul className="space-y-2 text-white text-xl">
              <li>
                <button
                  onClick={() => handleNavigation("/auction/today")}
                  className="hover:text-orange-500"
                >
                  Today&apos;s Auctions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/favourite")}
                  className="hover:text-orange-500"
                >
                  Favourite
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/support/HowTurboBidswork")}
                  className="hover:text-orange-500"
                >
                  How TurboBids work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/support/CommonQuession")}
                  className="hover:text-orange-500"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/support/TermsofService")}
                  className="hover:text-orange-500"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social and Download Section */}
        <div>
          <div>
            <h2 className="text-3xl text-orange-500 ">Follow Us!</h2>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-white hover:text-orange-500"
              >
                <Image
                  src="/IMG/Facebook_Logo.png"
                  alt="Facebook"
                  width={32}
                  height={32}
                />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-white hover:text-orange-500"
              >
                <Image
                  src="/IMG/X_Logo.png"
                  alt="Twitter"
                  width={32}
                  height={32}
                />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-white hover:text-orange-500"
              >
                <Image
                  src="/IMG/IG_Logo.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-3xl text-orange-500 ">Download!</h2>
            <div className="flex flex-col">
              <Link href="https://play.google.com/store">
                <Image
                  src="/IMG/GooglePlay_Logo.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={32}
                />
              </Link>
              <Link href="https://apps.apple.com">
                <Image
                  src="/IMG/AppleStore_Logo.png"
                  alt="Download on the App Store"
                  width={150}
                  height={32}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
