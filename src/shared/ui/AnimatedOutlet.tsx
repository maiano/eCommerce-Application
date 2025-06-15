import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

export function AnimatedOutlet() {
  const location = useLocation();
  const [displayKey, setDisplayKey] = useState(location.pathname);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setDisplayKey(location.pathname);
      }}
    >
      <motion.div
        key={displayKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
