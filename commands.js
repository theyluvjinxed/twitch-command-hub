/*
  YOUR COMMAND LIST — edit this file to add your REAL commands.
  Each command is one object inside the array below.

  Fields:
    name: command viewers type (example: "!hug")
    bot: exactly "Mix It Up", "Nightbot", or "StreamElements"
    category: a label such as "Community", "Fun", "Stream", or "Moderation"
    description: what the command does
    copyText: the text to copy. Use the exact command or response text you want.
    example: true means it is a DEMO entry and will show an Example label.
            Set example: false for your real commands.

  To add a command: copy one object, paste it between two entries, and edit the details.
  Remember to separate objects with commas. Do not remove the [ or ] brackets.
*/
window.COMMANDS = [
  {
    name: "!hug",
    bot: "Mix It Up",
    category: "Community",
    description: "Example: send a hug to another chatter. Replace the sample text with your actual command setup.",
    copyText: "!hug @username",
    example: true
  },
  {
    name: "!Josh",
    bot: "Mix It Up",
    category: "Inside jokes",
    description: "Example: check or add to your community's Josh-mentioned counter.",
    copyText: "!Josh",
    example: true
  },
  {
    name: "!so",
    bot: "StreamElements",
    category: "Shoutouts",
    description: "Example: give a streamer a shoutout. Your bot may use a different syntax or require a target name.",
    copyText: "!so username",
    example: true
  },
  {
    name: "!join",
    bot: "Nightbot",
    category: "Community",
    description: "Example: let chat know you want to join a game or queue. Update this to match your real setup.",
    copyText: "!join",
    example: true
  },
  {
    name: "!lurk",
    bot: "Nightbot",
    category: "Community",
    description: "Example: tell the streamer you're lurking.",
    copyText: "!lurk",
    example: true
  },
  {
    name: "!commands",
    bot: "StreamElements",
    category: "Info",
    description: "Example: direct viewers to the full command list.",
    copyText: "!commands",
    example: true
  }
];
