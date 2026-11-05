import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, step, totalSteps }) => {
  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between text-sm font-bold">
        <span className="text-navy">
          Paso {String(step).padStart(2, "0")}
          <span className="text-navy/40"> / {String(totalSteps).padStart(2, "0")}</span>
        </span>
        <span className="text-navy/40">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-navy/10">
        <motion.div
          className="h-full rounded-full bg-turquoise"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
