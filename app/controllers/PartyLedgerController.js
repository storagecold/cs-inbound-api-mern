const AccountUtils = require('../utils/AccountUtils');
const amadObj = require('../models/Amad');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    accountNotFound: 'Account does not exist.',
    retrieveSuccess: 'Record retrieved successfully.',
    fetchError: 'Error fetching Account.',
};

exports.getprtyLedger = async (req, res) => {
    try {
        const account = req.params.accountId;
        const accountExists = await AccountUtils.AccountExists({ _id: account });
        if (!accountExists) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountNotFound,
            });
        };
        const amads = await amadObj.find({ account }, { packets: 1 })
        let totalPacket = 0;
        if (amads.length) {
            amads.map((amad) => {
                return totalPacket = totalPacket + amad.packets;
            })
        }
        const data = {
            PacketAmad: totalPacket,
            PacketNikasi: 0,
            packetBalance: totalPacket

        }
        return res.jsonp({
            status: STATUS_MESSAGES.success,
            messageId: 200,
            message: STATUS_MESSAGES.retrieveSuccess,
            data
        })
    } catch (error) {
        return res.jsonp({
            status: STATUS_MESSAGES.error,
            messageId: 500,
            message: STATUS_MESSAGES.fetchError
        })
    }
}
