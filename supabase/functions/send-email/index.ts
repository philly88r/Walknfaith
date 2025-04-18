// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://supabase.com/docs/guides/functions/deno-runtime

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AppointmentData {
  type: string;
  date: string;
  name: string;
  email: string;
  phone?: string;
}

interface EmailRequest {
  type: 'contact' | 'appointment';
  to: string;
  subject: string;
  data: ContactFormData | AppointmentData;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, to, subject, data } = await req.json() as EmailRequest;

    // Configure email client
    // Note: You'll need to set these environment variables in your Supabase project
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOSTNAME") || "smtp.gmail.com",
      port: Number(Deno.env.get("SMTP_PORT")) || 465,
      username: Deno.env.get("SMTP_USERNAME") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    let emailBody = '';
    let replyTo = '';

    // Construct email body based on request type
    if (type === 'contact') {
      const contactData = data as ContactFormData;
      replyTo = contactData.email;
      emailBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (type === 'appointment') {
      const appointmentData = data as AppointmentData;
      replyTo = appointmentData.email;
      emailBody = `
        <h2>New Appointment Request</h2>
        <p><strong>Appointment Type:</strong> ${appointmentData.type}</p>
        <p><strong>Date/Time:</strong> ${appointmentData.date}</p>
        <p><strong>Name:</strong> ${appointmentData.name}</p>
        <p><strong>Email:</strong> ${appointmentData.email}</p>
        ${appointmentData.phone ? `<p><strong>Phone:</strong> ${appointmentData.phone}</p>` : ''}
      `;
    }

    // Send the email
    await client.send({
      from: Deno.env.get("SMTP_FROM") || "noreply@walknfaith.org",
      to: to,
      subject: subject,
      content: emailBody,
      html: emailBody,
      replyTo: replyTo,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ success: false, message: `Failed to send email: ${error.message}` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
