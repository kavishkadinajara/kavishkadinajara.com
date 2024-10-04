import React from "react";
import { Card, CardHeader } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { motion } from "framer-motion";

type Skill = { name: string; icon: string; level: string };
type Education = {
  institution: string;
  degree: string;
  year: string;
  details: string;
};
type Certificate = { title: string; issuedBy: string; date: string };

const skills: Skill[] = [
  {
    name: "HTML",
    icon: "https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png",
    level: "Advanced",
  },
  {
    name: "CSS",
    icon: "https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png",
    level: "Advanced",
  },
  {
    name: "JavaScript",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // Replaced with PNG
    level: "Advanced",
  },
  {
    name: "React",
    icon: "https://img.icons8.com/color/344/react-native.png", // Replaced with PNG
    level: "Intermediate",
  },
  {
    name: "TypeScript",
    icon: "https://img.icons8.com/color/344/typescript.png", // Replaced with PNG
    level: "Intermediate",
  },
  // {
  //   name: "C",
  //   icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", // PNG format
  //   level: "Intermediate",
  // },
  {
    name: "C++",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", // PNG format
    level: "Intermediate",
  },
  // {
  //   name: "C#",
  //   icon: "https://cdn.iconscout.com/icon/free/png-512/csharp-1-1175241.png", // PNG format
  //   level: "Intermediate",
  // },
  {
    name: "Python",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", // Replaced with PNG
    level: "Intermediate",
  },
  {
    name: "Java",
    icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png", // Replaced with PNG
    level: "Intermediate",
  },
  {
    name: "PHP",
    icon: "https://img.icons8.com/officel/344/php-logo.png", // PNG format
    level: "Intermediate",
  },
  {
    name: "Node.js",
    icon: "https://img.icons8.com/fluency/344/node-js.png", // PNG format
    level: "Intermediate",
  },
  {
    name: "Express.js",
    icon: "https://img.icons8.com/ios/452/express-js.png", // PNG format
    level: "Intermediate",
  },
  {
    name: "Next UI",
    icon: "https://github.com/user-attachments/assets/9027732b-de8c-4c4b-a065-235e15e33e5e", // PNG format
    level: "Intermediate",
  },
  {
    name: "Next.js",
    icon: "/next-js.svg", // SVG works fine in most cases
    level: "Intermediate",
  },
  {
    name: "Expo",
    icon: "//img.icons8.com/?size=100&id=hmieDPifBlBM&format=png&color=000000", // PNG format
    level: "Intermediate",
  },
  {
    name: "Tailwind CSS",
    icon: "https://img.icons8.com/color/344/tailwindcss.png", // PNG format
    level: "Intermediate",
  },
  // {
  //   name: "Spring",
  //   icon: "https://cdn.iconscout.com/icon/free/png-512/spring-3-1175253.png", // PNG format
  //   level: "Intermediate",
  // },
  // {
  //   name: "Azure",
  //   icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png", // PNG format
  //   level: "Intermediate",
  // },
  // {
  //   name: "DigitalOcean",
  //   icon: "https://github.com/user-attachments/assets/f3bee16b-3609-489f-9445-d08c0a52468b", // PNG format
  //   level: "Intermediate",
  // },
  {
    name: "MySQL",
    icon: "/mysql-2.svg", // PNG format
    level: "Intermediate",
  },
  {
    name: "PostgreSQL",
    icon: "https://img.icons8.com/color/344/postgreesql.png", // PNG format
    level: "Intermediate",
  },
  {
    name: "Supabase",
    icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png", // PNG format
    level: "Intermediate",
  },
  // {
  //   name: "Arduino",
  //   icon: "https://img.icons8.com/color/452/arduino.png", // PNG format
  //   level: "Intermediate",
  // },
  {
    name: "NPM",
    icon: "https://img.icons8.com/color/452/npm.png", // PNG format
    level: "Intermediate",
  },
];

const educationList: Education[] = [
  {
    institution: "National Institute of Business Management, Galle",
    degree: "Higher National Diploma in Software Engineering",
    year: "October 2023 – Present",
    details:
      "Pursuing an in-depth HND in Software Engineering. Current GPA: 3.81",
  },
  {
    institution: "National Institute of Business Management, Galle",
    degree: "Diploma in Software Engineering",
    year: "August 2022 – September 2023",
    details:
      "Completed a comprehensive Software Engineering diploma program. GPA: 3.91",
  },
  {
    institution: "Vidyaloka College, Galle",
    degree: "Advance Level & Ordinary Level Examination",
    year: "2013 – 2021",
    details: "Completed general education at the secondary level.",
  },
];

const certificates: Certificate[] = [
  { title: "Frontend Development", issuedBy: "Coursera", date: "2022" },
];

export default function ProfileDetails() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs = [
    {
      id: "skills",
      label: "Skills",
      content: (
        <div className="skills-container flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 mx-4 sm:mx-10 md:mx-16 lg:mx-28 py-6 px-4 sm:px-8 md:px-10 rounded-3xl bg-[#20431972] hover:bg-[#193e4372] transition-colors duration-300">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              animate="visible"
              initial="hidden"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              variants={fadeIn}
            >
              <div className="flex flex-col items-center gap-4 sm:gap-6 hover:shadow-xl transition-shadow">
                <img
                  alt={skill.name}
                  className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                  src={skill.icon}
                />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                  {skill.name}
                </p>
                {/* Uncomment this line if you want to show the skill level */}
                {/* <p className="text-sm text-gray-600">{skill.level}</p> */}
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "education",
      label: "Education",
      content: educationList.map((education, index) => (
        <motion.div
          key={education.institution}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.5, delay: index * 0.2 }}
          variants={fadeIn}
        >
          <Card className="mb-4 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div>
                <h5 className="text-lg font-semibold">{education.degree}</h5>
                <p className="text-gray-500">
                  {education.institution} - {education.year}
                </p>
                <p className="mt-2 text-gray-600">{education.details}</p>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      )),
    },
    {
      id: "certificates",
      label: "Certificates",
      content: certificates.map((certificate, index) => (
        <motion.div
          key={certificate.title}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.5, delay: index * 0.2 }}
          variants={fadeIn}
        >
          <Card className="mb-4 hover:shadow-xl transition-shadow">
            <CardHeader>
              <div>
                <h5 className="text-lg font-semibold">{certificate.title}</h5>
                <p className="text-gray-500">
                  {certificate.issuedBy} - {certificate.date}
                </p>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      )),
    },
  ];

  return (
    <div className="flex w-full justify-center items-center flex-col p-6 shadow-md rounded-lg">
      <h1 className="text-center text-xl md:text-3xl text-cyan-600 font-bold mb-6">
        My Profile
      </h1>
      <Tabs aria-label="Profile Details tabs" size="lg" variant="underlined">
        {tabs.map((tab) => (
          <Tab key={tab.id} title={tab.label}>
            <div className="py-4">{tab.content}</div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
