import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaYoutube } from "react-icons/fa";

interface DemoViewProps {
  youtubeLink: string;
}

const DemoView: React.FC<DemoViewProps> = ({ youtubeLink }) => {
  const [isOpen, setIsOpen] = useState(false); // Manual open/close state management
  const [backdrop, setBackdrop] = useState<"opaque" | "blur" | "transparent">(
    "opaque",
  );

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <a
          className="text-red-500 hover:text-red-700 text-2xl"
          href={youtubeLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaYoutube /> {/* YouTube Icon */}
          <span className="sr-only">Watch Demo</span>
        </a>
        <Button
          onClick={() => {
            setBackdrop("blur");
            setIsOpen(true); // Open modal
          }}
        >
          Open Modal Demo
        </Button>
      </div>

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Demo Video
            </ModalHeader>
            <ModalBody>
              <div className="mt-4 mb-6">
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="rounded-lg shadow-md"
                  frameBorder="0"
                  height="315"
                  src={youtubeLink}
                  title="YouTube video player"
                  width="100%"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DemoView;
