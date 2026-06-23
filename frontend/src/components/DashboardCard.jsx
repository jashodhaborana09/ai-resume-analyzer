import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, detail, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 ${accent}`}
  >
    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{title}</p>
    <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{detail}</p>
  </motion.div>
);

export default DashboardCard;
