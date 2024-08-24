const mongoose = require("mongoose")

const hoadingSchema = new mongoose.Schema({
    state: { type: String,  },
    city: { type: String,  },
    location: { type: String,  },
    media: { type: String,  },
    width: { type: Number,  },
    height: { type: Number,  },
    sft: { type: Number,  },
    unitType: { type: String,  },
    rpm: { type: Number,  },
    flexInstallation: { type: String,  },
    total: { type: Number,  },
    image:{type:String}
})

const hoading = mongoose.model("Hoading", hoadingSchema)

module.exports = hoading