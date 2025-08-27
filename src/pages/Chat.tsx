import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
          <Chat />
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default ChatPage;