import "./NotFoundPage.css";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const NotFoundPage = () => {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.7, y: -30 },
    animate: { opacity: 1, scale: 1, y: 0 },
  };
  return (
    <section className="not-found container">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="not-found__content"
      >
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Ops! Está página não existe.</p>
        <Link to="/" className="button button--danger">
          <ArrowLeft /> Voltar
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFoundPage;
