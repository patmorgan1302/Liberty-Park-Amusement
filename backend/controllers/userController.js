import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc Auth a User
// @router POST /api/users/login
// @access Public 

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);    

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }   else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

// @desc Register User
// @router POST /api/users
// @access Public 

const registerUser = asyncHandler(async (req, res) => {
    const { name, email , password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

// @desc Logout User
// @router POST /api/users/logout
// @access Public 

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
       
    });
    res.status(200).json({ message: 'Logged Out Successfully'})
});

// @desc Get User Profile
// @router Get /api/products
// @access Private 

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

// @desc GEt user prfolie
// @router Get /api/users/prfile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }

});

// @desc Get uSers
// @router PUT /api/products
// @access Private/admin 

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

const getUserByID = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc Fetch all Products
// @router DELETE /api/user/:id
// @access Public/admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc Update User
// @router Get /api/user/:id
// @access Private/admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});


export { 
    authUser, 
    getUserProfile, 
    registerUser, 
    logoutUser, 
    updateUserProfile, 
    getUsers,
    getUserByID, 
    deleteUser, 
    updateUser 
};