import "./AboutPage.css";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const containerVariants = {
  initial: { opacity: 0, translateY: -30 },
  animate: { opacity: 1, translateY: 0 },
};

const linksContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, translateY: -10, scale: 0.8 },
  visible: { opacity: 1, translateY: 0, scale: 1 },
};

const AboutPage = () => {
  return (
    <>
      <section className="about container">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="about__content"
        >
          <Link to="/" className="about__link">
            <ArrowLeft />
            Voltar
          </Link>
          <h1 className="title">Sobre</h1>
          <p className="about__text">
            Olá! Meu nome é <strong>Paulo Victor</strong>, sou{" "}
            <strong>Desenvolvedor Frontend</strong> e este projeto foi criado
            como parte do meu portfólio.
            <br /> <br />
            Utilizando tecnologias como{" "}
            <strong>
              React, Framer Motion, TipTap, React Router e Firebase
            </strong>
            . Acompanhe meus trabalhos e novidades pelas redes sociais!
          </p>

          <motion.div
            className="about__socials"
            variants={linksContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.a
              variants={linkVariants}
              href="https://github.com/paulopbi"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--default"
            >
              GitHub
            </motion.a>
            <motion.a
              variants={linkVariants}
              href="https://www.linkedin.com/in/paulopbi/"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--default"
            >
              LinkedIn
            </motion.a>
            <motion.a
              variants={linkVariants}
              href="https://paulo-victor-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--default"
            >
              Portfolio
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutPage;
