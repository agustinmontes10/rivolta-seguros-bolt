import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ProgressBarProps {
  progress: number;
  animationData: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, animationData }) => {
  return (
    <div className="mb-8 mt-3">
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-[#3ec1d3] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="relative mt-2">
        <motion.div
          className="absolute"
          initial={{ left: 0 }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ transform: "translateY(-65%) translateX(-75%)" }}
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              style={{ width: 120, height: 120 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;