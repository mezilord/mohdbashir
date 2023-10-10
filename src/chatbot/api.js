export const fetchResponse = async (chat) => {
  try {
    const response = await fetch("https://server-chatbot-ten.vercel.app/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat.map((message) => message.message).join(" \n "),
      }),
      mode: "no-cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
