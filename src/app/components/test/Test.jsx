"use client"
import { gsap ,SplitText} from '@/app/lib/gsap/gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
// import { SplitText } from "gsap/SplitText";


export const AnimatedComponent = () => {
    const container = useRef(null);
    // useGSAP(() => {
    //     // Create split text instance
    //     const splitText = new SplitText(".fade-element", { type: "chars,words" });
    //     const chars = splitText.chars;
    //     const words = splitText.words;

    //     // Animate the split text
    //     gsap.from(chars, {
    //         scrollTrigger: {
    //             trigger: ".fade-element",
    //             start: "top 80%",
    //             end: "top 20%",
    //             toggleActions: "play none none reverse"
    //         },
    //         opacity: 0,
    //         y: 50,
    //         stagger: 0.05,
    //         duration: 1,
    //         ease: "back.out(1.7)"
    //     });

    //     // Slide animation
    //     gsap.from(".slide-element", {
    //         scrollTrigger: {
    //             trigger: ".slide-element",
    //             start: "top 75%",
    //             end: "top 25%",
    //             toggleActions: "play none none reverse"
    //         },
    //         x: -100,
    //         opacity: 0,
    //         duration: 1,
    //         ease: "power3.out"
    //     });
    // }, { scope: container });


    return (
        <div ref={container}>
            <div className="fade-element">Fade In</div>
            <div className="slide-element">Slide In</div>
        </div>
    );
};