import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

// Function to check for valid code based on common keywords and structure
function isValidCode(code) {
  const keywords = /\b(function|const|let|var|if|else|for|while|return|class|import|public|private|static|void|abstract|final|protected|synchronized|transient|native|interface|enum|extends|implements|package|break|continue|do|switch|case|default|goto|try|catch|finally|throw|throws|instanceof|new|super|this|\=|boolean|byte|char|short|int|long|float|double|String|System|out|println|Scanner|Math|Arrays|ArrayList|HashMap|LinkedList|HashSet|Collections)\b/;

  // Check for basic keywords and some basic structure (parentheses, curly braces)
  if (keywords.test(code) && /[(){}\[\]]/.test(code)) {
    return true;
  }
  return false;
}

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const problemText = "tìm số nhỏ nhất trong dãy 10 số ngẫu nhiên.";

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();

    if (!isValidCode(question)) {
      setAnswer("Please enter valid code for review.");
      setGeneratingAnswer(false);
      return;
    }

    setAnswer("Analyzing your code... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      // Update answer with the actual review from the API response
      setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  async function guideCode() {
    setGeneratingAnswer(true);
    setAnswer("Generating guide... \n It might take upto 10 seconds");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        method: "post",
        data: {
          contents: [
            { parts: [{ text: "Hãy tưởng tượng bạn là giáo sư chuyên ngành Công nghệ thông tin. Hướng dẫn tôi cách viết hàm" + problemText + "Chỉ cho tôi ý tưởng và hướng dẫn từng bước để giúp tôi tìm cách giải quyết vấn đề về mã. Đừng viết ra mã gợi ý hay mã giả, hãy để tôi tự viết." }] },
          ],
        },
      });

      const guide = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setAnswer(guide);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Couldn't generate guide at this time.");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="bg-white h-screen p-3 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mr-2 border rounded bg-gray-50 p-3">
          <form onSubmit={generateAnswer} className="text-center">
            <a href="https://github.com/Vishesh-Pandey/chat-ai" target="_blank">
              <h1 className="text-3xl text-center">Code Reviewer</h1>
            </a>
            <textarea
              required
              className="border rounded w-full min-h-fit p-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter code for review"
              style={{ height: "450px" }}
            ></textarea>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300 mx-2"
                disabled={generatingAnswer}
              >
                Analyze Code
              </button>
              <button
                type="button"
                onClick={guideCode}
                className="bg-green-300 p-3 rounded-md hover:bg-green-400 transition-all duration-300"
                disabled={generatingAnswer}
              >
                Guide Code
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 ml-2 border rounded bg-gray-50 p-3">
          <div className="text-center">
            <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>

  );

}

export default App;
