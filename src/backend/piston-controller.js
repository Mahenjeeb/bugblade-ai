const availableRunTime = async (_, resp) => {
  try {
    const runTimesResp = await fetch(
      "https://emkc.org/api/v2/piston/runtimes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const runTimeDetails = await runTimesResp.json();
    resp.status(200).json({ message: runTimeDetails });
  } catch (error) {
    resp.status(500).json({ message: "Internal Server Error" });
  }
};

const executeCode = async (req, resp) => {
  const { language, code } = req.body;
  
  // Validate input
  if (!language || !code) {
    return resp.status(400).json({ 
      success: false, 
      message: "Language and code are required" 
    });
  }

  try {
    const executeCodeResp = await fetch(
      "https://emkc.org/api/v2/piston/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          version: "*",
          files: [{ name: "main", content: code }],
        }),
      }
    );

    if (!executeCodeResp.ok) {
      const errorData = await executeCodeResp.text();
      console.error("Piston API error:", errorData);
      return resp.status(executeCodeResp.status).json({ 
        success: false, 
        message: `Piston API error: ${executeCodeResp.status}` 
      });
    }

    const executeCodeDetails = await executeCodeResp.json();
    
    // Return a consistent response structure
    resp.status(200).json({ 
      success: true, 
      message: executeCodeDetails 
    });
  } catch (error) {
    console.error("Code execution error:", error);
    resp.status(500).json({ 
      success: false, 
      message: "Internal Server Error: " + error.message 
    });
  }
};
export { availableRunTime, executeCode };
