var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: {
        type: 'ObjectId'
    },
    username: {
        type: 'String'
    },
    email: {
        type: 'String'
    },
    password: {
        type: 'String'
    },
    meta: {
        salt: {
            type: 'String'
        },
        token: {
            type: 'String'
        },
        isImporter: {
            type: 'Boolean'
        },
        sharePublicly: {
            type: 'Array'
        },
        hash: {
            type: 'String'
        },
        showViolence: {
            type: 'Boolean'
        },
        showMaturity: {
            type: 'Boolean'
        },
        lastLogin: {
            type: 'Date'
        },
        created: {
            type: 'Date'
        },
        status: {
            type: 'String'
        },
        updated: {
            type: 'Date'
        },
        lastActivity: {
            type: 'Date'
        },
        isGuest: {
            type: 'Boolean'
        },
        invitationCode: {
            type: 'String'
        }
    },
    settings: {
        pushNotifications: {
            type: 'Boolean'
        },
        emailNotifications: {
            type: 'Boolean'
        }
    },
    social: {
        twitter: {
            type: 'String'
        },
        google: {
            type: 'String'
        },
        facebook: {
            type: 'String'
        }
    },
    media: {
        avatar: {
            type: 'String'
        }
    },
    phone: {
        type: 'String'
    },
    gender: {
        type: 'String'
    },
    url: {
        type: 'String'
    },
    about: {
        type: 'String'
    },
    name: {
        last: {
            type: 'String'
        },
        first: {
            type: 'String'
        }
    },
    dob: {
        type: 'Date'
    },
    groups: {
        type: 'Array'
    }
});

module.exports = mongoose.model('users', userSchema);