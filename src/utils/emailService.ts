import supabase from './supabaseClient';

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

/**
 * Sends contact form data to the client's email
 * @param formData Contact form data
 * @returns Promise with success status and message
 */
export const sendContactFormEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Insert the contact form data into Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw new Error(error.message);

    // Use Supabase Edge Function to send email (this will need to be created in Supabase)
    const { data, error: functionError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'contact',
        to: 'Sabrina@walknfaith.org', // Client's email
        subject: `Contact Form: ${formData.subject}`,
        data: formData,
      },
    });

    if (functionError) throw new Error(functionError.message);

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { 
      success: false, 
      message: 'Failed to send message. Please try again or contact us directly.' 
    };
  }
};

/**
 * Sends appointment data to the client's email
 * @param appointmentData Appointment data
 * @returns Promise with success status and message
 */
export const sendAppointmentEmail = async (appointmentData: AppointmentData): Promise<{ success: boolean; message: string }> => {
  try {
    // Insert the appointment data into Supabase
    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          type: appointmentData.type,
          scheduled_date: appointmentData.date,
          name: appointmentData.name,
          email: appointmentData.email,
          phone: appointmentData.phone || null,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw new Error(error.message);

    // Use Supabase Edge Function to send email
    const { data, error: functionError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'appointment',
        to: 'Sabrina@walknfaith.org', // Client's email
        subject: `New Appointment Request: ${appointmentData.type}`,
        data: appointmentData,
      },
    });

    if (functionError) throw new Error(functionError.message);

    return { success: true, message: 'Appointment scheduled successfully!' };
  } catch (error) {
    console.error('Error sending appointment email:', error);
    return { 
      success: false, 
      message: 'Failed to schedule appointment. Please try again or contact us directly.' 
    };
  }
};
