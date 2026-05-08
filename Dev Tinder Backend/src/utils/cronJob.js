const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

cron.schedule("55 14 * * * ", async () => {
  // console.log("hello world" + new Date());
  try {
    const yesterday = subDays(new Date(), 1);
    const startofYesterday = startOfDay(yesterday);
    const endofYesterday = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: startofYesterday,
        $lte: endofYesterday,
      },
    }).populate("fromUserId toUserId");

    console.log("Pending requests found today:", pendingRequests.length);

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.email)),
    ];

    for (const email of listOfEmails) {
      // Find the user's name from the first request found for them
      const receiverName = pendingRequests.find(
        (req) => req.toUserId.email === email,
      ).toUserId.firstName;

      const subject = "Pending Connection Requests Reminder";
      const text = `Hi ${receiverName},\n\nYou have pending connection requests on Dev Tinder! Log in to your account to review and connect with them.\n\nLog in to your account to review the request.`;

      await sendEmail(email, subject, text);
    }
  } catch (error) {
    console.log(error.message);
  }
});
