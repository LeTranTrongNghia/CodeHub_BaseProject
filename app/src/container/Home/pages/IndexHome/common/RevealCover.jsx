import { motion } from 'framer-motion';

const variant = {
  hidden: {
    width: '100%',
  },
  visible: {
    width: '0%',
    transition: {
      duration: 1.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const RevealCover = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-background z-10" // Tailwind CSS classes
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.6, once: true }}
    />
  );
};

export default RevealCover;