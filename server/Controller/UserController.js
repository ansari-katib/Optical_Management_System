const User = require("../Model/UserModel")

// * carete user 
const createUser = async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        const newUser = new User({
            name,
            email,
            password,
            userType
        })
        const saveUser = await newUser.save();
        res.status(201).json({ message: "user created successfully", user: saveUser });
    } catch (error) {
        res.status(500).json({ message: "Error while creating user ", error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(201).json({ message: "all users get successfully", users: allUser });
    } catch (error) {
        res.status(500).json({ message: "error fetching users", error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully", user: deleteUser });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { _id } = req.params;
    const { name, email, password } = req.body;

    if (!_id || !name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error during update:", error.message);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};



module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser
}