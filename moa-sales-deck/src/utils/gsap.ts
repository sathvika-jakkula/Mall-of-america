import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, DrawSVGPlugin)

export { gsap, ScrollTrigger, Flip, SplitText, DrawSVGPlugin }
