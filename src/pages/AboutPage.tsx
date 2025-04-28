import "./AboutPage.css";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, translateY: -10 },
  visible: { opacity: 1, translateY: 0 },
};

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <section className="about container">
        <motion.div
          initial={{ opacity: 0, translateY: "-30px" }}
          animate={{ opacity: 1, translateY: "0" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="about__content"
        >
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
            variants={containerVariants}
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
