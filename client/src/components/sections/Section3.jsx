import React, { useEffect, useRef, useState } from "react";
import Img2 from "../../assets/img/section3bg.png";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Mouse from "../utils/Mouse";
import Close from "../utils/Close";
import Detail2Comment from "../comment/Detail2Comment";
import Detailsec3 from "../detail/Detailsec3";

const Section3 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  gsap.registerPlugin(ScrollTrigger);
  const circleMaskRef = useRef(null);
  const section3Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // 스크롤 제어 함수
    const toggleScroll = (isPopupOpen) => {
      if (isPopupOpen) {
        document.body.style.overflow = "hidden"; // 스크롤 막기
      } else {
        document.body.style.overflow = "unset"; // 스크롤 허용
      }
    };
    toggleScroll(isPopupOpen);

    return () => {
      toggleScroll(false);
    };
  }, [isPopupOpen]);

  // openPopupAnimaition
  const PoupAnimation = () => {
    const tl = gsap.timeline();

    tl.to(
      ".contents3",
      {
        width: "90%",
        duration: 1,
        delay: 1,
      },
      "<"
    )
      .to(
        ".cont__box>.desc",
        {
          display: "none",
          duration: 0.5,
        },
        "<"
      )
      .to(
        ".mouse__cursor",
        {
          display: "none",
        },
        "<"
      )
      .to(
        ".content__img--2",
        {
          display: "none",
          zIndex: -2,
        },
        "<"
      )
      .to(
        ".hidden__img",
        {
          display: "block",
          zIndex: -1,
        },
        "<"
      )
      .to(imgRef.current, {
        width: "50%",
        height: "100%",
        left: 0,
        xPercent: 0,
        ease: "power2.in",
        duration: 1,
      })
      .to(imgRef.current, {
        maxWidth: "640px",
        duration: 1,
      })
      .to(
        text1Ref.current,
        {
          xPercent: 0,
          ease: "none",
          duration: 0.5,
        },
        "<"
      )
      .to(
        text2Ref.current,
        {
          xPercent: -50,
          ease: "none",
          duration: 0.3,
        },
        "<"
      )
      .to(".left__box", {
        opacity: 1,
        display: "block",
        zIndex: 2,
      })
      .fromTo(
        ".right__box",
        {
          opacity: 0.3,
          right: "0",
          top: "50%",
          translateX: "0%",
          translateY: "-50%",
          width: "40%",
        },
        {
          opacity: 1,
          width: "50%",
          display: "block",
          position: "absolute",
          ease: "power1.inOut",
          height: "100%",
        }
      )
      .to(
        ".close",
        {
          display: "block",
        },
        "<"
      )
      .fromTo(
        ".comment__result>.comments",
        {
          opacity: 0.2,
          y: -40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: -0.2,
          duration: 0.3,
          ease: "bounce.out",
        },
        "<"
      )
      .fromTo(
        ".detail__wrap>.details",
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: -0.2,
          duration: 0.5,
          ease: "sine.in",
        },
        "<"
      );

    return tl;
  };

  // ClosePopupAnimaition
  const ClosePoupAnimation = () => {
    const tl = gsap.timeline();

    tl.to(".right__box", {
      width: "40px",
      duration: 1,
      opacity: 0,
      ease: "expo.out",
      display: "none",
    })
      .to(
        ".left__box",
        {
          opacity: 0,
          scale: 0.9,
          ease: "expo.out",
          display: "none",
        },
        "<"
      )
      .to(
        ".close",
        {
          display: "none",
        },
        "<"
      )
      .to(
        imgRef.current,
        {
          width: "70%",
          height: "50%",
          maxWidth: "1280px",
          left: "50%",
          xPercent: -50,
          ease: "expo.in",
          duration: 1,
        },
        "<"
      )
      .to(".contents2 .desc", {
        display: "block",
        opacity: 1,
      })
      .to(
        ".mouse__cursor",
        {
          display: "block",
        },
        "<"
      )
      .to(
        ".hidden__img",
        {
          display: "none",
          zIndex: -1,
        },
        "<"
      )
      .to(".content__img--2", {
        display: "block",
        onComplete: () => {},
      });

    return tl;
  };

  const openPopup = () => {
    // 팝업 상태 변경
    setIsPopupOpen(true);
    // 이미지 교체 애니메이션 실행
    PoupAnimation();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    ClosePoupAnimation();
  };

  useEffect(() => {
    const maskAnimation = gsap.to(circleMaskRef.current, {
      attr: { r: 950 },
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 2,
      },
    });
    gsap.to(".contents3 .desc", {
      opacity: 0.5,
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "center center",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    gsap.to(text1Ref.current, {
      opacity: 1,
      left: "0",
      top: "0",
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "25% center",
        end: "bottom bottom",
        ease: "none",
        scrub: true,
      },
    });

    gsap.to(text2Ref.current, {
      opacity: 1,
      right: "0",
      bottom: "0",
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "25% center",
        end: "bottom bottom",
        scrub: true,
        ease: "none",
      },
    });

    return () => {
      maskAnimation.kill();
      ScrollTrigger.getById("section3-trigger")?.kill();
    };
  }, []);

  return (
    <section id="section3">
      <div className="contents3" ref={section3Ref}>
        <Close onClick={closePopup} />
        <div className="cont__box" ref={imgRef}>
          <Detail2Comment />
          <div className="text1" ref={text1Ref}>
            react
          </div>
          <div className="text2" ref={text2Ref}>
            blog site
          </div>
          <div className="desc">
            React, Node.js, MongoDB, Firebase를 사용하여
            <br />
            블로그 플랫폼을 구축하였습니다.
          </div>
          <div className="hidden__img"></div>
          <svg
            className="content__img content__img--2"
            width="100%"
            height="100%"
            viewBox="0 0 913 516"
            onClick={openPopup}
          >
            <defs>
              <filter id="displacementFilter2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.1"
                  numOctaves="1"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  result="displacement"
                  scale="100"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feMorphology
                  operator="dilate"
                  radius="2"
                  result="morph"
                  in="displacement"
                />
              </filter>
              <mask id="circleMask2">
                <circle
                  cx="50%"
                  cy="50%"
                  r="0"
                  fill="white"
                  ref={circleMaskRef}
                  className="mask"
                  style={{ filter: "url(#displacementFilter2)" }}
                />
              </mask>
            </defs>
            <image
              xlinkHref={Img2}
              width="100%"
              height="100%"
              mask="url(#circleMask2)"
            />
          </svg>
          <Mouse imgRef={imgRef} />
        </div>
        <Detailsec3 />
      </div>
    </section>
  );
};

export default Section3;
