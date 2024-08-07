const handler = async (event) => {
  const Event = JSON.parse(event.Records[0].body);
  try {
    if (!Event) {
      throw new Error("No body");
    }
    const ProcessEvent = await ProcessEventMessage(Event);
    if (!ProcessEvent) {
      throw new Error("Error processing event");
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event processed" }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

const ProcessEventMessage = async (Message) => {
  try {
    if (!Message) {
      throw new Error("No body");
    }
    // Do something with the message
    const LogEvent = await LogEventMessage(Message);
    if (!LogEvent) {
      throw new Error("Error logging event");
    }
    return true;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

const LogEventMessage = async (Message) => { 
  try {
    if (!Message) {
      throw new Error("No body");
    }
    console.log(Message);
    return true;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = {
  handler,
};
