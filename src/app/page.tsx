"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const ScrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXvalues = [-800, -900, -400];
    const rightXvalues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray<HTMLElement>(".row").forEach((row, index) => {
      const cardLeft = row.querySelector<HTMLElement>(".card-left");
      const cardRight = row.querySelector<HTMLElement>(".card-right");

      if (cardLeft && cardRight) {
        gsap.to(cardLeft, {
          x: leftXvalues[index],
          scrollTrigger: {
            trigger: ".main",
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${
                progress * leftXvalues[index]
              }px) 
            translateY(${progress * yValues[index]}px) 
            rotate(${progress * leftRotationValues[index]}deg)`;

              cardRight.style.transform = `translateX(${
                progress * rightXvalues[index]
              }px) 
            translateY(${progress * yValues[index]}px) 
            rotate(${progress * rightRotationValues[index]}deg)`;
            },
          },
        });
      }
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });

    gsap.to(".line p", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      stagger: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });
  }, []);

  const ImageRows = () => {
    return Array.from({ length: 3 }, (_, i) => (
      <div className="row" key={i}>
        <div className="card card-left">
          <Image src={`/img-${2 * i + 1}.png`} alt="img" fill />
        </div>
        <div className="card card-right">
          <Image src={`/img-${2 * i + 2}.png`} alt="img" fill />
        </div>
      </div>
    ));
  };

  return (
    <ReactLenis root>
      <section className="hero">
        <div className="img">
          <Image src="/pro.png" alt="logo" fill />
        </div>
      </section>

      <section className="main">
        <div className="main-content">
          <div className="logo">
            <Image src="/file.svg" alt="logo" fill />
          </div>

          <div className="copy">
            <div className="line">
              <p>Delve into coding without clutter.</p>
            </div>
            <div className="line">
              <p>One subscription. Endless web design.</p>
            </div>
            <div className="line">
              <p>Take the fast lane to mastery.</p>
            </div>
          </div>

          <div className="btn">
            <button>Get Pro</button>
          </div>
        </div>

        <ImageRows />
      </section>

      <section className="footer">
        <Link href="codegrid.gumroad.com/l/codegridpro">
          Link in description
        </Link>
      </section>
    </ReactLenis>
  );
}
