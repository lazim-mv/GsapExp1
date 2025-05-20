"use client"
import React, { useRef, useState } from 'react'
import styles from './Services.module.css'
import './services.css'
import headerStyles from '../header/Header.module.css'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap/gsap'
import { ArrowUpRight } from 'lucide-react'

const ServicesComponent = ({ isMobile }) => {

    const services = [
        {
            title: "Development",
            media: "/videos/6.mp4",
            description: "We craft high-performance websites and custom software solutions that are scalable, secure, and designed to grow alongside your business—empowering you to innovate faster and deliver value with confidence."
        },
        {
            title: "Web Design",
            media: "/videos/5.mp4",
            description: "Our designs blend sleek aesthetics with seamless usability, helping you captivate users and turn visitors into customers. We build engaging, responsive interfaces that make your brand stand out online."
        },
        {
            title: "Mobile Apps",
            media: "/videos/7.mp4",
            description: "We develop mobile apps that offer smooth performance, intuitive navigation, and cross-platform compatibility—helping you reach users wherever they are with powerful functionality in their pocket."
        },
        {
            title: "Digital Marketing",
            media: "/videos/8.mp4",
            description: "We help your brand get noticed, generate leads, and drive sales through targeted digital marketing strategies tailored to maximize ROI across SEO, social media, and paid campaigns."
        },
        {
            title: "Graphic Design",
            media: "/videos/4.mp4",
            description: "From logos to full brand identity systems, our visual design team brings your message to life with creative, compelling graphics that leave a lasting impression across digital and print media."
        }
    ];



    const containerRef = useRef(null);
    const leftSideRef = useRef(null);
    const rightSideRef = useRef(null);
    const descRef = useRef(null);
    const [cardRefs] = useState(() =>
        Array(services.length).fill(null).map(() => React.createRef())
    );
    const [currentDesc, setCurrentDesc] = useState(services[0].description);

    useGSAP(() => {
        const container = containerRef.current;
        const header = document.querySelector('[data-header]');
        if (!container || !header) return;

        let lastScrollTop = 0;

        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    if (self.progress > 0.01) {
                        header.classList.add(headerStyles.hiddenHeader);
                    } else {
                        // Back to the top
                        header.classList.remove(headerStyles.hiddenHeader);
                    }
                }
            }
        });

        cardRefs.forEach((ref, index) => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    if (index !== 0) updateDescription(index);
                },
                onEnterBack: () => {
                    updateDescription(index);
                }
            });
        });

        const updateDescription = (index) => {
            const splitText = new SplitText(descRef.current, { type: "lines" });
            gsap.to(splitText.lines, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.inOut",
                onComplete: () => {
                    setCurrentDesc(services[index].description);
                    requestAnimationFrame(() => {
                        const newSplitText = new SplitText(descRef.current, { type: "lines" });
                        gsap.fromTo(newSplitText.lines,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                stagger: 0.05,
                                ease: "power2.out"
                            }
                        );
                    });
                }
            });
        };

    }, []);



    return (
        <div ref={containerRef} className={styles.container} data-services-container id='services-pin'>
            <div ref={leftSideRef} className={styles.leftSide}>
                <h2>Our <br /> Services</h2>
                <div className={styles.mainDesc}>
                    <p ref={descRef}>{currentDesc}</p>
                </div>
            </div>
            <div ref={rightSideRef} className={styles.rightSide}>
                {services.map((service, index) => (
                    <div ref={cardRefs[index]} key={index} className={styles.card}>
                        <div className={styles.content}>
                            <h3>{service.title}</h3>
                            <a href="" className={styles.learnMore}>Learn More <ArrowUpRight className={styles.socialIcon} /></a>
                        </div>
                        <video
                            // ref={videoRef1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={styles.backgroundVideo}
                        >
                            <source src={service.media} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {/* <img src={service.img} alt="" /> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServicesComponent;