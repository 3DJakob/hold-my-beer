import React, { useRef } from 'react'
import { useSpring, animated } from 'react-spring'

const strength = 10

const calc = (x: number, y: number): number[] => [-y * strength, x * strength, 1.03]
const trans = (x: number, y: number, s: number): string => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export interface CardProps {
  children: any
}

const Card: React.FC = ({ children }) => {
  const [props, set] = useSpring<{ xys: number[] }>(() => (
    {
      xys: [0, 0, 1],
      config: { mass: 5, tension: 1000, friction: 80 }
    }))

  const mouseLeave = (): void => {
    set({ xys: [0, 0, 1] })
  }
  const myRef: any = useRef(null)

  const mouseMove = (e: any): void => {
    const rect = myRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.x) / rect.width
    const y = (e.clientY - rect.y) / rect.height
    set({ xys: calc(x - 0.5, y - 0.5) })
  }

  return (
    <animated.div
      ref={myRef}
      className='card'
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      style={{ transform: props.xys.interpolate(trans), borderRadius: 20, overflow: 'hidden' }}
    >
      {children}
    </animated.div>
  )
}

export default Card
