import axios from 'axios';

// 設定 OpenAI API 金鑰
const apiKey = 'sk-XotdDMEEwDh8mZYE5e2aF7D2DeBc40EfB206E96e66E070F2';

async function getChatGPTResponse(message) {
  const url = 'https://free.gpt.ge/v1/chat/completions';
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
  };
  const data = {
      model: 'gpt-3.5-turbo-1106', // 或者你使用的其他模型
      messages: [
        {
          role: 'system',
          content: "你只能講繁體中文，你要幫我分析我的數據並提供建議，回應盡量在20個字以內"
        },
        {
          role: 'system',
          content: "如果喝水量比平均值還少，請提出警告並說出建議"
        },
        {
            role: 'user',
            content: message
        },
        temperature=0.8,
        max_tokens=64
      ]
  };

  try {
    const response = await axios.post(url, data, { headers });
    // 檢查 API 回應的結構
    if (response.data && response.data.choices && response.data.choices.length > 0) {
        const chatResponse = response.data.choices[0].message.content;
        return chatResponse;
    } else {
        console.error('Unexpected API response structure:', response.data);
        throw new Error('Unexpected API response structure');
    }
  } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw new Error('Failed to get response from ChatGPT');
  }
}

// 測試函數
getChatGPTResponse('我前幾次散步的喝水量為2L、1.8L、2.2L，這次的喝水量為1L')
  .then(response => {
      console.log('ChatGPT response：', response);
  })
  .catch(error => {
      console.error('錯誤：', error.message);
  });
