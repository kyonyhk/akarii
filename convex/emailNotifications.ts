import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// Email notification action for new founder messages
export const sendFounderMessageNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const founderEmails = process.env.FOUNDER_EMAIL || "founder@akarii.com";
    
    // Parse multiple emails separated by commas
    const notificationEmails = founderEmails
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured - email notification skipped");
      return { success: false, error: "Email not configured" };
    }

    try {
      const resend = new Resend(resendApiKey);

      const formattedDate = new Date(args.timestamp).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Founder Message</h1>
            <p style="color: #999; margin: 5px 0;">Someone reached out through the Akarii contact form</p>
          </div>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #fff; margin-top: 0; font-size: 18px;">Contact Details</h2>
            <p style="margin: 8px 0;"><strong style="color: #ccc;">Name:</strong> ${args.name}</p>
            <p style="margin: 8px 0;"><strong style="color: #ccc;">Email:</strong> <a href="mailto:${args.email}" style="color: #4A9EFF;">${args.email}</a></p>
            ${args.company ? `<p style="margin: 8px 0;"><strong style="color: #ccc;">Company:</strong> ${args.company}</p>` : ''}
            <p style="margin: 8px 0;"><strong style="color: #ccc;">Submitted:</strong> ${formattedDate}</p>
          </div>
          
          <div style="background-color: #111; padding: 20px; border-radius: 8px;">
            <h2 style="color: #fff; margin-top: 0; font-size: 18px;">Message</h2>
            <div style="background-color: #222; padding: 15px; border-radius: 6px; border-left: 4px solid #4A9EFF;">
              <p style="margin: 0; line-height: 1.5; white-space: pre-wrap;">${args.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Reply directly to this email to respond to ${args.name}
            </p>
          </div>
        </div>
      `;

      const result = await resend.emails.send({
        from: "Akarii Contact Form <noreply@akarii.ai>",
        to: notificationEmails,
        replyTo: args.email,
        subject: `New message from ${args.name}${args.company ? ` (${args.company})` : ''}`,
        html: emailHtml,
      });

      console.log("Email notification sent successfully:", result.data?.id);
      return { success: true, emailId: result.data?.id };
    } catch (error) {
      console.error("Failed to send email notification:", error);
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  },
});