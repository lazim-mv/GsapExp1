"use client"
import Image from 'next/image'
import styles from './Header.module.css'
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { ScrollTrigger } from '../../lib/gsap/gsap'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const menuItemsRef = useRef(null)
    const bottomItemRef = useRef(null)
    const tlRef = useRef(null)

    useGSAP(() => {

        const header = document.querySelector('[data-header]');
        if (!header) return;

        let lastScrollTop = 0;
        let isHidden = false;

        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                const st = window.pageYOffset || document.documentElement.scrollTop;

                if (st > lastScrollTop && !isHidden) {
                    // Hide header on scroll down
                    gsap.to(header, {
                        yPercent: -100,
                        opacity: 0,
                        pointerEvents: 'none',
                        duration: 0.6,
                        ease: "power3.inOut",
                    });
                    isHidden = true;
                } else if (st < lastScrollTop && isHidden) {
                    // Show header on scroll up
                    gsap.to(header, {
                        yPercent: 0,
                        opacity: 1,
                        pointerEvents: 'auto',
                        duration: 0.6,
                        ease: "power3.out",
                        
                    });
                    isHidden = false;
                }

                lastScrollTop = st;
            }
        });
        const tl = gsap.timeline({ paused: true })
        tlRef.current = tl


        // Initial state
        gsap.set([menuItemsRef.current.children, bottomItemRef.current], {
            y: 100,
            opacity: 0,
            pointerEvents: 'none'
        })

        // Menu background animation
        tl.to(menuRef.current, {
            clipPath: 'circle(150% at 100% 0)',
            duration: 0.8,
            ease: "power2.inOut"
        })

        // Menu items animation
        tl.to(menuItemsRef.current.children, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.3,
            pointerEvents: 'auto',
            ease: "power2.out"
        }, "-=0.4")

        // Bottom items animation
        tl.to(bottomItemRef.current, {
            y: 0,
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.5")

    }, [])

    const handleMenuToggle = () => {
        setMenuOpen(prev => {
            const isOpen = !prev
            if (isOpen) {
                tlRef.current?.play()
            } else {
                tlRef.current?.reverse()
            }
            return isOpen
        })
    }

    const menuItems = [
        "Hosting",
        "Automation",
        "Web Development",
        "Mobile App Development",
    ]

    return (
        <>
            <div className={styles.container} data-header>
                <div className={styles.logoContainer}>
                    <h2 className={styles.logoText}>Zentrolis</h2>
                    {/* <Image src="/logos/new/white.png" width={100} height={100} className={styles.logo} alt="logo" /> */}
                </div>
                <div className={`buttonCta ${styles.btnContainer}`} onClick={handleMenuToggle}>
                    Menu
                </div>
            </div>

            <div ref={menuRef} className={styles.menuOverlay}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <h2 className={styles.logoText}>Zentrolis</h2>
                    </div>
                    <div
                        className={`buttonCta ${styles.btnContainer} ${styles.closeBtn}`}
                        onClick={handleMenuToggle}
                    >
                        Close
                    </div>
                </div>
                <div className={styles.menuContent}>
                    <div ref={menuItemsRef} className={styles.menuItems}>
                        {menuItems.map((item, index) => (
                            <div key={index} className={styles.menuItem}>{item}</div>
                        ))}
                        <div ref={bottomItemRef} className={styles.bottomItem}>
                            <div className={styles.socials}>
                                <a href="" className={styles.socialItem}>Instagram <ArrowUpRight className={styles.socialIcon} /></a>
                                <a href="" className={styles.socialItem}>LinkedIn <ArrowUpRight className={styles.socialIcon} /></a>
                            </div>
                            <h1>Let's Create <ArrowUpRight className={styles.socialIcon} /></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
