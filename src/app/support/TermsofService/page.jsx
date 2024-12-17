"use client";

import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import "../../globals.css";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8 font-happy">
        {/* Header */}
        <h1 className="text-5xl font-bold text-orange-500 mb-6 font-happy">
          Terms Of Service
        </h1>

        {/* Terms Section */}
        <section className="bg-white rounded-md shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 font-happy">
            COPART WEBSITE TERMS AND CONDITIONS 
          </h2>
          <p className="text-lg mb-4 font-happy">Last updated on: October 3, 2024</p>
          <p className="text-lg mb-6 font-happy">
            Section titles in the Terms of Service are for convenience only and have no legal or contractual effect.
          </p>

          {/* Section 1 */}
          <h3 className="text-xl font-semibold mt-6 mb-4 font-happy">
            1. ACCEPTANCE OF TERMS
          </h3>
          <p className="text-lg mb-6 font-happy">
            Turbobids, Inc. and its subsidiaries and affiliates (“Turbobids”) provides its internet products, services, and Content (defined below; collectively, the “Service”) to you subject to the following Terms of Service ("TOS"), which may be updated by us from time to time without notice to you. You can review the most current version of the TOS at any time at Turbobids Website Terms of Service. In addition, when using particular Turbobids services, you shall be subject to any posted guidelines, rules,Member Terms and Conditions , and/or policies and procedures applicable to such services which may be posted from time to time. All such items are hereby incorporated by reference into the TOS.
          </p>

          {/* Section 2 */}
          <h3 className="text-xl font-semibold mt-6 mb-4 font-happy">
            2. MEMBER ACCOUNT, PASSWORD AND SECURITY
          </h3>
          <p className="text-lg mb-6 font-happy">
            If you complete the Service's registration process, you will receive a username and password linked to your account with Turbobids. You are responsible for maintaining the confidentiality of the username and password, and are fully responsible for all activities that occur under your username, password, or on your account. You agree to (a) immediately notify Turbobids of any unauthorized use of your username and password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session. Turbobids cannot and will not be liable for any loss or damage arising from your failure to comply with this section.
          </p>

          {/* Section 3 */}
          <h3 className="text-xl font-semibold mt-6 mb-4 font-happy">
            3. MODIFICATIONS TO SERVICE
          </h3>
          <p className="text-lg mb-6 font-happy">
            Turbobids reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Turbobids shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
          </p>

          {/* General Information */}
          <h3 className="text-xl font-semibold mt-6 mb-4 font-happy">
            GENERAL INFORMATION
          </h3>
          <p className="text-lg mb-4 font-happy">
          The TOS and the relationship between you and Turbobids shall be governed by the laws of the State of Texas without regard to its conflict of law provisions. You and Turbobids agree to submit to the personal and exclusive jurisdiction of the courts located within the county of Dallas, in the state of Texas. The failure of Turbobids to exercise or enforce any right or provision of the TOS shall not constitute a waiver of such right or provision. If any provision of the TOS is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of the TOS remain in full force and effect. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or the TOS must be filed within one (1) year after such claim or cause of action arose or be forever barred.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsOfService;