const Contact = require('../Model/ContactModel');

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, message, lookingfor } = req.body;
    const newContact = new Contact({ name, phone, email, message, lookingfor });
    await newContact.save();
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