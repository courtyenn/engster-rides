import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const client = new SESClient({ region: process.env.AWS_REGION || "us-west-1" });

const from_name = "Engsta Rides";
const from_email = "hey@engstarides.com";
const to_email = "hey@engstarides.com";
// const from_email = "noreply@courtyen.io";
// const to_email = "noreply@courtyen.io";

const buildMsg = ({ name, email, subject, message, garage }) => {
  const input = {
    // SendEmailRequest
    Source: `${from_name} <${from_email}>`, // required
    Destination: {
      // Destination
      ToAddresses: [
        // AddressList
        to_email,
      ],
    },
    Message: {
      // Message
      Subject: {
        // Content
        Data: "New Form Submission: " + subject, // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        Text: {
          Data: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
            What's in YOUR garage?: ${garage}
          `, // required
          Charset: "UTF-8",
        },
      },
    },
    ReplyToAddresses: [email],
  };
  const command = new SendEmailCommand(input);
  return client.send(command);
};

export async function sendEmail(formData) {
  try {
    await buildMsg(formData);
  } catch (err) {
    console.error("sendEmail error: ", err);
  }
}
