import "regenerator-runtime/runtime.js";
import * as Sphinx from "sphinx-bot";
require("dotenv").config();
const msg_types = Sphinx.MSG_TYPE;

let initted = false;

const sphinxToken = process.env.SPHINX_TOKEN;

const PREFIX = "example";

function init() {
  if (initted) return;
  initted = true;

  const client = new Sphinx.Client();
  client.login(sphinxToken);

  client.on(msg_types.INSTALL, async (message) => {
    console.log("=> Received an install!");
    const embed = new Sphinx.MessageEmbed()
      .setAuthor("ExampleBot")
      .setDescription("Welcome to Example Bot!")
      .setThumbnail(botSVG);
    message.channel.send({ embed });
  });

  client.on(msg_types.MESSAGE, async (message) => {
    console.log("=> Received a message!");
    const arr = message.content.split(" ");
    if (arr.length < 2) return;
    if (arr[0] !== "/" + PREFIX) return;
    const cmd = arr[1];

    const isAdmin = message.member.roles.find((role) => role.name === "Admin");
    console.log("isAdmin?", isAdmin);

    switch (cmd) {
      case "test":
        const embed = new Sphinx.MessageEmbed()
          .setAuthor("ExampleBot")
          .setTitle("A Test:")
          .addFields([
            { name: "Hi:", value: "Hello", inline: true },
            { name: "Hi 2:", value: "Hello 2", inline: true },
          ]);
        message.channel.send({ embed });
        return;

      default:
        const embed2 = new Sphinx.MessageEmbed()
          .setAuthor("ExampleBot")
          .setTitle("ExampleBot Commands:")
          .addFields([{ name: "test", value: "/example test" }]);
        message.channel.send({ embed: embed2 });
        return;
    }
  });
}

init();
