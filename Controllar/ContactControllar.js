const Contact = require('../Model/ContactModel');
const nodemailer = require('nodemailer');


// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, message, lookingfor } = req.body;
    const newContact = new Contact({ name, phone, email, message, lookingfor });
    await newContact.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mediamanmd@gmail.com',
        pass: 'tuls epem fvwb pltc'
      }
    });

    // Email template
    const emailTemplate = (recipientName) => `
     <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
       <div style="text-align: center; padding: 20px;">
         <img src="https://media-man.vercel.app/static/media/logo.94585481204bda4cb964.png" alt="Mediaman Logo" style="max-width: 150px;">
       </div>
       <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
         <h2 style="color: #444;">Hello ${recipientName},</h2>
         <p>Thank you for reaching out to Mediaman. We have received your message:</p>
         <p><strong>Message:</strong> ${message}</p>
         <p>We will get back to you shortly.</p>
         <br>
         <p>Best regards,<br>Mediaman Team</p>
       </div>
     </div>
   `;

    // Send email to the user
    await transporter.sendMail({
      from: 'mediamanmd@gmail.com',
      to: email,
      subject: 'Thank you for contacting Mediaman',
      html: emailTemplate(name),
    });

    // Send email to the admin
    await transporter.sendMail({
      from: 'mediamanmd@gmail.com',
      to: 'mediamanmd@gmail.com',
      subject: 'New Contact Submission',
      html: `
       <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
         <div style="text-align: center; padding: 20px;">
           <img src="https://media-man.vercel.app/static/media/logo.94585481204bda4cb964.png" alt="Mediaman Logo" style="max-width: 150px;">
         </div>
         <div style="padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
           <h2>New Contact Request</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Looking For:</strong> ${lookingfor}</p>
           <p><strong>Message:</strong> ${message}</p>
         </div>
       </div>
     `,
    });

    res.status(200).json({ message: 'Contact created successfully', contact: newContact });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};



// Delete a contact by ID
exports.deleteContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.deleteOne()
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const data = await Contact.find()
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Record Not found"
      })
    }
    else {
      res.status(200).json({
        success: true,
        message: "Record found Successfully",
        data: data
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}