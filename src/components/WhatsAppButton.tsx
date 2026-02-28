import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/573043677777"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-float"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={26} />
  </a>
);

export default WhatsAppButton;
