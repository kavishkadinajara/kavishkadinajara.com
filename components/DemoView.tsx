import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
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
      <div className="flex flex-wrap gap-3 w-full">
        <a
          className="text-red-500 hover:text-red-700 text-2xl"
          href={youtubeLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            className="w-6 h-6 inline"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
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
        className="max-w-5xl" // Optional: further limit modal size if needed
        isOpen={isOpen}
        size="lg" // Increased modal size
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
                  height="480" // Increased height for larger view
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
