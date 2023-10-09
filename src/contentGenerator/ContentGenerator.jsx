import React, { useState, useEffect } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

const ContentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [creativityLevel, setCreativityLevel] = useState(5);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentStyle, setContentStyle] = useState("formal");
  const [loadingDots, setLoadingDots] = useState(1);

  // loading dots
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingDots((prevDots) => (prevDots < 3 ? prevDots + 1 : 1));
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function fetchResponse() {
    try {
      const model = new ChatOpenAI({
        temperature: creativityLevel / 10, // creativityLevel is a number between 1 and 10
        maxTokens: 500,
        openAIApiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
        modelName: "gpt-3.5-turbo-16k",
      });

      const promptTemplate = PromptTemplate.fromTemplate(
        "Generate a social media post about the topic {Topic} the content must not exceed 200 words. \
        using these and other good keywords: \
        {Keywords}. Content should be {ContentStyle}. You need to return a json with two properties \
         A template example for answer is:  {example}"
      );
      const chain = promptTemplate.pipe(model);
      const result = await chain.invoke({
        Topic: topic,
        ContentStyle: contentStyle,
        Keywords: keywords,
        example: `{"heading": <heading>, "content": <content> }`,
      });
      return JSON.parse(result.content);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGenerateContent() {
    setIsLoading(true);
    await fetchResponse()
      .then((data) => {
        setGeneratedContent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="text-sm bg-slate-900 text-white min-h-screen p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-semibold my-8">
            AI Social Media Content Generator
          </h1>
          <div className="mb-8">
            <label htmlFor="topic" className="block mb-2">
              Topic:
            </label>
            <input
              type="text"
              id="topic"
              className="w-full bg-gray-800 text-white p-2 rounded"
              placeholder="e.g. 'Artificial Intelligence'"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="keywords" className="block mb-2">
              Keywords:
            </label>
            <input
              type="text"
              id="keywords"
              placeholder="e.g. 'AI, Machine Learning, Deep Learning'"
              className="w-full bg-gray-800 text-white p-2 rounded"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <div className="mb-2">Select Content Style:</div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="formal"
                  checked={contentStyle === "formal"}
                  onChange={() => setContentStyle("formal")}
                  className="mr-2"
                />
                Formal
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="funny"
                  checked={contentStyle === "funny"}
                  onChange={() => setContentStyle("funny")}
                  className="mr-2"
                />
                Funny
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="informative"
                  checked={contentStyle === "informative"}
                  onChange={() => setContentStyle("informative")}
                  className="mr-2"
                />
                Informative
              </label>
              {/* Add more options as needed */}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex gap-4">
              <label htmlFor="creativityLevel" className="block mb-2">
                Creativity Level:
              </label>
              <p className="text-center">{creativityLevel}/10</p>
            </div>
            <input
              type="range"
              id="creativityLevel"
              className="w-full bg-gray-800 text-white"
              min={0}
              max={10}
              step={1}
              value={creativityLevel}
              onChange={(e) => setCreativityLevel(parseInt(e.target.value))}
            />

            <button
              className="w-full my-6 bg-violet-600 text-white p-2 rounded hover:bg-violet-700 transition duration-300"
              onClick={handleGenerateContent}
              disabled={isLoading}
            >
              {isLoading
                ? `Generating${".".repeat(loadingDots)}`
                : "Generate Content"}
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        {generatedContent && (
          <div className="mt-4 mb-24 max-w-[800px] mx-auto">
            <h2 className="text-3xl font-semibold mb-2">Generated Content:</h2>
            <div className="bg-gray-800 p-4 rounded">
              <pre className="whitespace-pre-wrap font-medium text-2xl">
                {generatedContent.heading}
              </pre>
              <pre className="whitespace-pre-wrap text-lg mt-4">
                {generatedContent.content}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContentGenerator;
