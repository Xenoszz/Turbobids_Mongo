"use client";

import React, { useState } from "react";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import "../../globals.css";

const faqData = [
  {
    question: "How do I start bidding and buying in TurboBids auctions?",
    answer:
      "The first step to bidding and buying in TurboBids’s auctions is to register to be a TurboBids Member. Registration is completely free and only takes a few minutes. Just upload a copy of your government-issued ID, then once your documents and account information have been reviewed and approved, Basic TurboBids Members have up to $2,000 USD Buying Power without needing a deposit on file.",
  },
  {
    question: "How do I bid in TurboBids online auctions?",
    answer:
      "There are three primary methods of bidding in TurboBids auctions: Preliminary Bidding Once the vehicle is listed on TurboBids’s website, TurboBids Members can place preliminary bids (‘pre-bids’) on vehicles at any time up to one hour before the start of the live auction. Pre-bids will be represented during the live auction and could be the winning bid if no other bidder submits a higher bid during either the pre-bid phase or the live auction. If there is a tie between pre-bid and live bid amounts, the virtual (live) bidder prevails as the highest bidder on the item. Live Bidding Bidders can bid live against other Members during a virtual auction. If a Member’s bid is the highest when the circular, dynamic countdown timer stops, the Member wins the sale of the vehicle (pending sale approval from Seller). Buy It Now Members can bypass the virtual auction of certain vehicles labeled Buy It Now. Bids can still be placed on these vehicles, but Members can also purchase them immediately for a predetermined price.",
  },
  {
    question: "Why can’t I bid?",
    answer:
      "Take these few steps to make sure you can bid. Some of these things are related to your account, and others have to do with the location and type of vehicle you are trying to bid on. Some states have special requirements to buy salvage or clean title vehicles. Check the Licensing Map to find out if a business license is required to buy in the state where the vehicle is located. Upgrading from Basic to Premier will not allow you to bypass the business licensing requirements of the state. To make sure your account is ready to bid, you must have an active Basic or Premier Member account with a valid photo ID on file. A Premier membership allows you to bid higher amounts on more vehicles if you are eligible to bid on those vehicles in your state. To learn about the differences between Basic and Premier, see the Upgrades and Deposits page.",
  },
  {
    question: "How do I pay for a vehicle and schedule pickup after I’ve won?",
    answer:
      "According to our policy, you must come to the shop to inspect the vehicle and pay on-site to prevent fraud. Schedule pick-up during normal business hours. Have ready the Member Number and Car ID of the vehicle being picked up. Loading is first-come, first-served. Flatbed trucks are recommended for safe transportation of your vehicles. All heavy and medium-duty lots are self-load only.",
  },
  {
    question: "Can I ship my vehicle internationally?",
    answer:
      "TurboBids does not currently offer international shipping options. Please note: If you plan to use a third-party shipping service, TurboBids is not responsible for a vehicle’s condition once it leaves a TurboBids location.",
  },
];

function FaqPage() {
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (index) => {
    setOpenFaqs((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-happy">
      {/* Navbar */}
      <Navbar />

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto my-12 p-6">
        <h2 className="text-5xl font-bold text-orange-500 text-center mb-8">
          Why Buy With TurboBids?
        </h2>
        <h3 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#76A0FF] text-white rounded-lg shadow-lg"
            >
              {/* Question */}
              <div
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center p-6 cursor-pointer"
              >
                <span className="text-2xl font-bold">{item.question}</span>
                <span className="text-3xl">
                  {openFaqs[index] ? "▲" : "▼"}
                </span>
              </div>

              {/* Answer */}
              {openFaqs[index] && (
                <div className="bg-white text-gray-800 p-6 rounded-b-lg">
                  <p className="text-xl leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FaqPage;
