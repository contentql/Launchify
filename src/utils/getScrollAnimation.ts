export default function getScrollAnimation() {
  const left = {
    offscreen: {
      x: -150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration,
      },
    }),
  }
  const right = {
    offscreen: {
      x: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration,
      },
    }),
  }
  const top = {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration,
      },
    }),
  }
  const bottom = {
    offscreen: {
      y: -150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration,
      },
    }),
  }
  return { left: left, right: right, bottom: bottom, top: top }
}
