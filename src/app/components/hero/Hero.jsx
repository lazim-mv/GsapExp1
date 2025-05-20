"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import styles from './Hero.module.css'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

const Hero = ({ isMobile }) => {
    const lenisRef = useRef();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const mainBoxRef = useRef(null);
    const topBoxRef = useRef(null);
    const bottomBoxRef = useRef(null);
    const mainVideoRef = useRef(null);
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const serviceTextTopRef = useRef(null);
    const initialServiceTextRef = useRef(null);
    const serviceTextBottomRef = useRef(null);
    const [mobile, setMobile] = useState(false);
    const [currentService, setCurrentService] = useState(0);

    const services = [
        "Hosting",
        "Automation",
        "Web Development",
        "App Development",
    ]

    useEffect(() => {
        const video1 = videoRef1.current;
        const video2 = videoRef2.current;

        if (video1 && video2) {
            video1.onplay = () => {
                video2.currentTime = video1.currentTime;
                video2.play();
            };

            video2.onplay = () => {
                video1.currentTime = video2.currentTime;
                video1.play();
            };
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % services.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])


    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (isMobile) return;

        const container = containerRef.current;
        const servicesContainer = document.querySelector('[data-services-container]');
        const vh = window.innerHeight;
        let isAnimating = false;

        const handleMouseMove = (e) => {
            if (isAnimating) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();

            const x = (clientX - left - width / 2) / 60;
            const y = (clientY - top - height / 2) / 60;

            // Separate animations for title and box
            gsap.to(titleRef.current, {
                x: x * 0.10,
                y: y * 0.10,
                rotateX: -y * 0.20,
                rotateY: x * 0.20,
                duration: 0.6,
                ease: "power2.out",
                transformOrigin: "center",
                overwrite: "auto"
            });

            gsap.to(mainBoxRef.current, {
                x: x * 0.8,
                y: y * 0.8,
                rotateX: -y * 0.16,
                rotateY: x * 0.16,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        // Scroll animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainBoxRef.current,
                start: "top top",
                end: "+=200%",  // Reduced scroll length
                scrub: 1.5,     // Smoother scrubbing
                pin: true,
                pinSpacing: false,
                onUpdate: (self) => {
                    if (self.progress > 0.01) {
                        isAnimating = true;
                    } else {
                        isAnimating = false;
                    }
                    if (self.progress > 0.5) {
                        gsap.set(servicesContainer, {
                            visibility: 'visible',
                            opacity: 1,
                        });
                    } else {
                        gsap.set(servicesContainer, {
                            visibility: 'hidden',
                            opacity: 0,
                        });
                    }
                },
            }
        })
            .from(mainBoxRef.current, {
                scale: 0.6,     // Less dramatic scale
                duration: 2,
                ease: "power1.inOut",
            })
            .to(mainVideoRef.current, {
                opacity: 0,
                duration: 1.5,
            }, "<")
            .to(titleRef.current, {
                scale: 1.4,     // Less dramatic scale
                yPercent: -180,
                duration: 1.5,
                ease: "power1.inOut"
            }, "<")
            .to(titleRef.current, {
                opacity: 0,
                ease: "power1.inOut"
            }, "split+=0.3")
            .to(videoRef1.current, {
                filter: "blur(30px)",
                duration: 1.5,
            }, "split+=0.3")
            .to(videoRef2.current, {
                filter: "blur(30px)",
                duration: 1.5,
            }, "split+=0.3")
            .to(topBoxRef.current, {
                scaleY: 0,
                y: "-45vh",    // Reduced movement
                duration: 1.5,
                ease: "power1.inOut"
            }, "split+=0.3")
            .to(bottomBoxRef.current, {
                scaleY: 0,
                y: "45vh",     // Reduced movement
                duration: 1.5,
                ease: "power1.inOut"
            }, "split+=0.3")
            .to([serviceTextTopRef.current, serviceTextBottomRef.current], {
                display: 'block',
                opacity: 1,
                duration: .1,
            }, "split")
            .to([serviceTextTopRef.current, serviceTextBottomRef.current], {
                display: 'block',
                opacity: 1,
                duration: .1,
            }, "split");

        return () => container.removeEventListener('mousemove', handleMouseMove);
    }, [isMobile]);

    if (mobile)
        return (
            <div ref={containerRef} className={styles.container}>
                <h1 ref={titleRef} className={styles.heroTitle}>We Create</h1>
                <div className={styles.mobileMedia}>
                    <video
                        ref={videoRef1}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.backgroundVideo}
                    >
                        <source src="/videos/3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

        );

    return (
        // <ReactLenis ref={lenisRef} options={{
        //     duration: 2.4,
        //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //     orientation: 'vertical',
        //     gestureOrientation: 'vertical',
        //     smoothWheel: true,
        //     smoothTouch: false,
        //     touchMultiplier: 2,
        // }}>
        <div ref={containerRef} className={styles.container}>
            <video
                ref={mainVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className={styles.backgroundVideow}
            >
                <source src="/videos/3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1 ref={titleRef} className={styles.heroTitle}>We Create</h1>
            <div className={styles.box} ref={mainBoxRef}>
                <div ref={topBoxRef} className={styles.top}>
                    <video
                        ref={videoRef1}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.backgroundVideo}
                    >
                        <source src="/videos/3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div ref={serviceTextTopRef} className={styles.serviceTextTop}>
                        {services[currentService]}
                    </div>
                </div>

                <div ref={bottomBoxRef} className={styles.bottom}>
                    <video
                        ref={videoRef2}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.backgroundVideo}
                    >
                        <source src="/videos/3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div ref={serviceTextBottomRef} className={styles.serviceTextBottom}>
                        {services[currentService]}
                    </div>
                </div>
            </div>
            <div className={styles.socials}>
                <a href="" className={styles.socialItem}>Instagram <ArrowUpRight className={styles.socialIcon} /></a>
                <a href="" className={styles.socialItem}>LinkedIn <ArrowUpRight className={styles.socialIcon} /></a>
            </div>
        </div>
        // </ReactLenis>
    );
};

export default Hero