const Fees = require('../Models/FeesModel');

// 1. Fetch All Fees
const getAllFees = async (req, res) => {
    try {
        const fees = await Fees.find().populate( 'College_Name'); // Populates College name
        res.status(200).json({ fees });
    } catch (error) {
        res.status(500).send(error);
    }
};

// 2. Fetch Single Fee by ID
const getFeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const fee = await Fees.findById(id).populate('College_Id', 'College_Name');
        if (!fee) {
            return res.status(404).json({ message: "Fee not found" });
        }
        res.status(200).json({ fee });
    } catch (error) {
        res.status(500).send(error);
    }
};

// 3. Add New Fee
const addFee = async (req, res) => {
    const { Fee_Title, Fee_Amount, Status, College_Name } = req.body;

    try {
        const newFee = new Fees({
            Fee_Title,
            Fee_Amount,
            Status,
            College_Name
        });

        await newFee.save();

        // Fetch the newly created fee with populated College_Id
        const populatedFee = await Fees.findById(newFee._id).populate( 'College_Name');

        res.status(201).json({ fee: populatedFee });
    } catch (error) {
        res.status(500).send(error);
    }
};


// 4. Update Existing Fee by ID
const updateFee = async (req, res) => {
    const { id } = req.params;
    const { Fee_Title, Fee_Amount, Status, College_Name } = req.body;

    try {
        const updatedFee = await Fees.findByIdAndUpdate(
            id,
            { Fee_Title, Fee_Amount, Status, College_Name },
            { new: true }
        ).populate('College_Id', 'College_Name');

        if (!updatedFee) {
            return res.status(404).send({ error: 'Fee not found' });
        }

        res.status(200).json({ updatedFee });
    } catch (error) {
        res.status(500).send(error);
    }
};

// 5. Delete Fee by ID
const deleteFee = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedFee = await Fees.findByIdAndDelete(id);
        if (!deletedFee) {
            return res.status(404).send({ error: 'Fee not found' });
        }
        res.status(200).json({ message: 'Fee deleted successfully' });
    } catch (error) {
        console.error('Error deleting fee:', error); // Add logging
        res.status(500).send(error);
    }
};


module.exports = {
    getAllFees,
    getFeeById,
    addFee,
    updateFee,
    deleteFee
};
