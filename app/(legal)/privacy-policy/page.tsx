"use client";
import React from "react";
import {
  FaInfoCircle,
  FaEnvelope,
  FaLock,
  FaRegEdit,
  FaRegClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

import { SparklesPreview } from "@/components/SparklesPreview";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function PrivacyPolicyPage() {
  return (
    <SparklesPreview>
      <BackgroundBeamsWithCollision>
        <div className="m-8 text-gray-400 mt-24 md:mt-32">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto shadow-lg rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-center mb-6">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 text-center mb-4">
              Last updated: October 25, 2024
            </p>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaInfoCircle className="text-xl text-blue-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                Information We Collect
              </h2>
              <p className="text-gray-700 mt-2">
                When you visit the Site, we may automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some browsing activity
                on the Site.
              </p>
              <p className="text-gray-700 mt-2">
                We may also collect personal information you provide, such as
                your name and email address.
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="mb-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaEnvelope className="text-xl text-green-500 inline-block mr-2" />
              <h2 className="text-2xl font-semibold inline-block">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 mt-2">
                We use the information we collect to improve our website and
                your user experience, and to send occasional emails about
                updates or services with your consent.
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
                Sharing Your Information
              </h2>
              <p className="text-gray-700 mt-2">
                We do not sell or share your personally identifiable information
                with third parties. However, we may share information with
                trusted service providers who assist us in operating our website
                or providing services to you, under strict confidentiality.
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
                Data Retention
              </h2>
              <p className="text-gray-700 mt-2">
                We will retain your personal information only as long as
                necessary to fulfill the purposes outlined in this policy or for
                legal reasons.
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
                Your Rights
              </h2>
              <p className="text-gray-700 mt-2">
                You have the right to access, correct, or delete any personal
                information we have collected about you. If you wish to make any
                requests, please contact us via the information below.
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
                If you have any questions about this Privacy Policy, you can
                contact us at:
              </p>
              <p className="text-gray-900 text-center mt-2 font-medium">
                Email: kavishkadinajara@gmail.com
              </p>
            </motion.div>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </SparklesPreview>
  );
}
