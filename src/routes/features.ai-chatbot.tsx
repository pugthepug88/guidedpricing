import { createFileRoute } from '@tanstack/react-router';
import { AIChatbotPage } from '@/components/features/AIChatbotPage';
export const Route = createFileRoute('/features/ai-chatbot')({
  head: () => ({ meta: [
    { title: 'AI Chatbot | Answer Enquiries & Book Appointments | Zapla' },
    { name: 'description', content: 'Answer customer questions, collect enquiry details and book suitable appointments with Zapla’s AI Chatbot. Bring your team in when a person is needed.' },
    { name: 'robots', content: 'noindex, nofollow' },
    { property: 'og:title', content: 'AI Chatbot | Zapla' },
  ] }),
  component: AIChatbotPage,
});
