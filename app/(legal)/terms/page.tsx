"use client";
import React from "react";
import {
  FaGavel,
  FaLock,
  FaRegEdit,
  FaUserShield,
  FaRegClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

import { SparklesPreview } from "@/components/SparklesPreview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function TermsOfServicePage() {
  return (
    <SparklesPreview>
      <BackgroundBeamsWithCollision>
        <div className="m-8 text-gray-600 mt-24 md:mt-32">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-6">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-700 text-center mb-4">
              Last updated: 2024.10.23
            </p>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaGavel className="text-xl text-blue-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 mt-2">
                By accessing or using our website, you agree to comply with and
                be bound by these Terms of Service. If you do not agree, please
                refrain from using our services.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaUserShield className="text-xl text-green-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                User Responsibilities
              </h2>
              <p className="text-gray-700 mt-2">
                You are responsible for your actions on the site. You must not
                use the website for illegal purposes, or post or transmit any
                harmful content.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              <FaLock className="text-xl text-red-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                Intellectual Property
              </h2>
              <p className="text-gray-700 mt-2">
                All content and materials available on this site are protected
                by copyright, trademark, and other intellectual property laws.
                You may not use, copy, or distribute any content without
                permission.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.9 }}
            >
              <FaRegClock className="text-xl text-yellow-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                Modifications to Service
              </h2>
              <p className="text-gray-700 mt-2">
                We reserve the right to modify, suspend, or discontinue the
                service at any time, without notice. We are not liable for any
                changes or interruptions to our services.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 1.1 }}
            >
              <FaRegEdit className="text-xl text-purple-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                Termination
              </h2>
              <p className="text-gray-700 mt-2">
                We may terminate or suspend your access to the website at any
                time, without notice, for conduct that violates these terms or
                is harmful to other users or our business.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.3 }}
            >
              <h2 className="text-xl font-semibold text-center mt-8">
                Contact Us
              </h2>
              <p className="text-gray-700 text-center mt-2">
                If you have any questions regarding these Terms of Service, you
                can contact us at:
              </p>
              <p className="text-gray-400 text-center mt-2 font-medium">
                Email: contact@kavishkadinajara.com
              </p>
            </motion.div>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </SparklesPreview>
  );
}
