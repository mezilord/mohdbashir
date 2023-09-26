// import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import React from "react";
// import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
// import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Technologies.
        </h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 mb-10 text-secondary mx-auto text-justify text-[17px] max-w-2xl leading-[30px]"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab earum
        aliquid labore illo eaque officiis! Necessitatibus labore officiis
        nesciunt ducimus
      </motion.p>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div
            className="w-28 h-28 bg-slate-300 p-2 rounded-full hover:-translate-y-5 duration-200"
            key={technology.name}
          >
            {/* <BallCanvas icon={technology.icon} /> */}
            <img src={technology.icon} alt={technology.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
