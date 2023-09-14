const AccountObj = require('../models/Account');
const AmadObj = require('../models/Amad');
const NikasiObj = require('../models/Nikasi');

const STATUS_MESSAGES = {
    success: 'success',
    error: 'error',
    accountNotFound: 'Account does not exist.',
    retrieveSuccess: 'Record retrieved successfully.',
    fetchError: 'Error fetching Account.',
};

exports.getprtyLedger = async (req, res) => {
    try {
        let accountId = req.params.accountId;
        const account = await AccountObj.findOne({ _id: accountId, isDeleted: false });
        if (!account) {
            return res.json({
                status: STATUS_MESSAGES.error,
                messageId: 400,
                message: STATUS_MESSAGES.accountNotFound,
            });
        };

        const amads = await AmadObj.find({ account: accountId }, { amadNo: 1, lotNo: 1, packet: 1, balance: 1, nikasi: 1, createdAt: 1 }).populate('createdBy', 'role')
        const nikasiData = await NikasiObj.find({ account: accountId }, { amadNo: 1, lotNo: 1, packet: 1, createdAt: 1 }).populate('createdBy', 'role')

        let data = {
            amad: 0,
            nikasi: 0,
            balance: 0,
            name: '',
            village: '',
            mobile: 0,
            amadDetails: [{
                amadNo: 0,
                lotNo: '',
                packet: 0,
                nikasi: 0,
                balance: 0,
                createdBy: '',
                createdAt: ''
            }],
            nikasiDetails: [{
                amadNo: 0,
                lotNo: '',
                packet: 0,
                createdBy: '',
                createdAt: ''
            }],
        }
        data.name = `${account.firstName} ${account.lastName} ${account.careOf}  ${account.careOfName}`;
        data.village = ` ${account.address.village}`;
        data.mobile = `+91- ${account.mobile}`;

        amads.map((amadData) => {
            data.amad = data.amad + amadData.packet;
            data.nikasi = data.nikasi + amadData.nikasi;
            data.balance = data.balance + amadData.balance;
            data.amadDetails.push({
                amadNo: amadData.amadNo,
                lotNo: amadData.lotNo,
                packet: amadData.packet,
                nikasi: amadData.nikasi,
                balance: amadData.balance,
                createdBy: amadData.createdBy.role,
                createdAt: amadData.createdAt
            })
        })
        nikasiData.map((nikasi) => {
            data.nikasiDetails.push({
                amadNo: nikasi.amadNo,
                lotNo: nikasi.lotNo,
                packet: nikasi.packet,
                createdBy: nikasi.createdBy.role,
                createdAt: nikasi.createdAt
            })
        })
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
