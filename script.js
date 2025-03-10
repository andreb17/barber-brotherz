// Twilio SMS Notification Integration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendSmsNotification(appointmentDetails) {
      client.messages
        .create({
                   body: `New appointment booked for ${appointmentDetails.name} on ${appointmentDetails.date} at ${appointmentDetails.time}`,
                   from: '+1234567890', // Your Twilio number
                   to: '+14043091971'
        })
        .then(message => console.log(`SMS sent: ${message.sid}`))
        .catch(error => console.error(`Error sending SMS: ${error}`));
}
