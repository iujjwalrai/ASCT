import React from "react";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Card from "../Components/Card";
import { abouts } from "../assets/aboutUs";

const About = () => {
  return (
    <div className="bg-[#f8f9fa]">
      <Hero />

      {/* Header Section */}
      <section className="bg-black text-white text-center py-10 px-6">
        <h1 className="text-4xl font-extrabold mb-4">
          एडवोकेट सेल्फ केयर टीम - उत्तर प्रदेश
        </h1>
        <h2 className="text-2xl font-medium mb-2">
          आइये जानते हैं अधिवक्ता सेल्फ केयर टीम के बारे में क्या है ASCT
        </h2>
        <p className="text-md max-w-4xl mx-auto leading-relaxed">
          ASCT अधिवक्ताओं का, अधिवक्ताओं के लिए, अधिवक्ताओं के द्वारा समूह से
          जुड़े अधिवक्ताओं के असामयिक मृत्यु होने पर उनके परिवार को आर्थिक सहायता
          देने हेतु बनाया गया है।
        </p>
      </section>

      {/* Cards Section */}
      <section className="py-10 px-4 bg-[#eaeaea]">
        <div className="max-w-6xl mx-auto grid gap-y-14 gap-x-10 sm:grid-cols-1 md:grid-cols-2 place-items-center">
          {abouts.map((about) => (
            <Card key={about.head} head={about.head} desc={about.desc} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
