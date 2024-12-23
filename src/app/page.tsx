"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (introRef.current) {
      const introTimeline = gsap.timeline();

      /* bounce */
      introTimeline
        .to(".main-intro .egg", {
          rotation: 10, // 왼쪽으로 기울기
          duration: 0.2,
          ease: "power1.inOut",
        })
        .to(".main-intro .egg", {
          rotation: -10, // 오른쪽으로 기울기
          repeat: 3, // 3번 반복
          yoyo: true,
          duration: 0.4,
          ease: "power1.inOut",
        })
        .to(introRef.current, {
          y: "-100%", // 위로 사라짐
          duration: 1,
          ease: "power2.inOut",
        });
      /* 풍선 */
      // introTimeline
      //   .to(".main-intro img", {
      //     y: -200, // 위로 천천히 올라가기
      //     scale: 1.2, // 살짝 커지기
      //     duration: 1,
      //     ease: "power1.in",
      //   })
      //   .to(".main-intro img", {
      //     opacity: 0, // 사라지기
      //     duration: 0.5,
      //     ease: "power1.out",
      //   })
      //   .to(introRef.current, {
      //     y: "-100%", // 섹션 전체가 위로 사라짐
      //     duration: 1,
      //     ease: "power2.inOut",
      //   });
    }

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
          <Image src={`/${2 * i + 1}.png`} alt="img" fill />
        </div>
        <div className="card card-right">
          <Image src={`/${2 * i + 2}.png`} alt="img" fill />
        </div>
      </div>
    ));
  };

  return (
    <ReactLenis root>
      <div className="main-intro" ref={introRef}>
        <div className="image-wrapper egg">
          <Image
            src="/egg.png"
            alt="egg"
            layout="fill"
            className="responsive-image egg"
          />
        </div>
      </div>

      <section className="hero">
        <div className="img">
          <Image
            src="/main.png"
            alt="main"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>

      <section className="main">
        <div className="main-content">
          <div className="logo">
            <Image src="/egg.png" alt="logo" fill />
          </div>

          <div className="copy">
            <div className="line">
              <p>후라이를 한 번 팔아볼까...? 연탄불에 후라이!</p>
            </div>
            <div className="line">
              <p>
                오픈하자마자 <span className="bold">웨이팅 3시간!!</span>
              </p>
            </div>
            <div className="line">
              <p>
                홈쇼핑 <span className="red">최단 시간 매진!!!!</span>{" "}
              </p>
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
