const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { create, getUsersById, getUsers, updateUsers, deleteUsers, getUserByEmail } = require("./user.service");
const { sign } = require("jsonwebtoken");

const createUser = (req, res) => {
    const body = req.body;

    // Generate a salt
    const salt = genSaltSync(10);

    // Hash the password with the generated salt
    body.pass = hashSync(body.pass, salt);

    create(body, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: "Email Already Exists !"
            });
        }
    
        return res.status(200).send({
            success: 1,
            data: results,
            message: "Registeration Succesfull"
        });
    });

};


const getUsersByUserid = (req, res) => {
    const id = req.params.id;
    getUsersById(id, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            })
        }
        return res.json({
            success: 1,
            data: results
        });
    });
};
const getAllUsers = (req, res) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results

        });
    });
};
const updateUser = (req, res) => {
    const body = req.body;
    // Generate a salt
    const salt = genSaltSync(10);

    // Hash the password with the generated salt
    body.pass = hashSync(body.pass, salt);
    updateUsers(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                Message: "Failed to Update User"
            })
        }

        return res.json({
            success: 1,
            message: "updated succesfully"
        });
    });
};
const deleteUser = (req, res) => {
    const data = req.body;
    deleteUsers(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"

            });
        }
        return res.json({
            success: 1,
            message: "Users deleted succesfully"
        });
    });
};
const login = (req, res) => {
    // const body = req.body;
    const { email, pass } = req.body;
    getUserByEmail(email, pass, (error, record) => {
        console.log(email);
        if (error) {
            console.log("Database error:", error);
            return res.json({
                success: 0,
                message: "Database error",
            });
        }
        if (!record) {
            console.log("User not found");
            return res.json({
                success: 0,
                message: "Invalid Email or Password",
            });
        }

        let { pass: dataBasePassword } = record;
        const passwordMatched = compareSync(pass, dataBasePassword);

        if (passwordMatched) {
            dataBasePassword = undefined;
            const jsontoken = sign({ passwordMatched: record }, process.env.PRIVATE_KEY, {
                expiresIn: "1h",
            });
            console.log("Login successful");
            return res.json({
                success: 1,
                message: "Login Successfully",
                token: jsontoken,
            });
        } else {
            console.log("Invalid Password");
            res.json({
                success: 0,
                message: "Invalid Email or Password",
            });
        }
    });
};
module.exports = {
    createUser,
    getUsersByUserid,
    getAllUsers,
    updateUser,
    deleteUser,
    login
}

