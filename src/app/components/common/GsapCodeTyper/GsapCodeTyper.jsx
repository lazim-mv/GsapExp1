'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import styles from './GsapCodeTyper.module.css'

gsap.registerPlugin(TextPlugin)

const htmlLines = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '    <meta charset="UTF-8" />',
    '    <title> Procube </title>',
    '</head>',
    '<body>',
    '    <div id="root"></div>',
    '    <script src="index.js"></script>',
    '</body>',
    '</html>'
]

export default function GsapCodeTyper() {
    const containerRef = useRef(null)
    const cursorRef = useRef(null)

    useEffect(() => {
        const lines = containerRef.current.querySelectorAll('.codeLine')
        const tl = gsap.timeline({ delay: 0.5 })

        lines.forEach((line, index) => {
            const fullText = line.dataset.text
            tl.fromTo(line,
                { innerHTML: "" },
                {
                    duration: 0.05 * fullText.length,
                    innerHTML: fullText,
                    ease: "none",
                }
            )

            if (index < lines.length - 1) {
                tl.to(cursorRef.current, {
                    top: `${(index + 1) * 24}px`,
                    duration: 0.1
                })
            }
        })
    }, [])

    return (
        <pre className={styles.codeContainer}>
            <code ref={containerRef}>
                <div className={styles.lineNumbers}>
                    {htmlLines.map((_, i) => (
                        <span key={i}>{i + 1}</span>
                    ))}
                </div>
                <div className={styles.codeContent}>
                    {htmlLines.map((line, i) => (
                        <div key={i} className={`${styles.codeLine} codeLine`} data-text={line}></div>
                    ))}
                    <span ref={cursorRef} className={styles.cursor}>|</span>
                </div>
            </code>
        </pre>
    )
}