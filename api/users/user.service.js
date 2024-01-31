const pool = require("../../config/database");


const create = (data, callBack) => {
    // Check if the email already exists in the database
    pool.query(
        `SELECT * FROM user1 WHERE email = ?`,
        [data.email],
        (error, results) => {
            if (error) {
                console.log("Database error:", error);
                return callBack(error);
            }

            // If the email already exists, return an error
            if (results.length > 0) {
                const errorMessage = "Email already exists";
                console.log(errorMessage);
                return callBack(errorMessage);

            }

            // If the email is not found, proceed with the insertion
            pool.query(
                `INSERT INTO user1(username, mobile, email, pass) VALUES (?, ?, ?, ?)`,
                [data.username, data.mobile, data.email, data.pass],
                (error, results) => {
                    if (error) {
                        console.log("Database error:", error);
                        return callBack(error);
                    }
                    console.log("Data inserted successfully:", results);
                    return callBack(null, results);
                }
            );
        }
    );
};

const getUsers = callBack => {
    pool.query(
        `select id,username,mobile,email,pass from user1`,
        [],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results)
        }
    )

};
const getUsersById = (id, callBack) => {
    pool.query(
        `select id,username,mobile,email,pass from user1 where id =?`,
        [id],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0])
        }
    )

};
const updateUsers = (data, callBack) => {
    console.log(data);
    pool.query(
        `update user1 set username=?,mobile=?,email=?,pass=? where id=?`,
        [data.username, data.mobile, data.email, data.pass, data.id]
        ,
        (error, results) => {
            if (error) {
                console.log("Database error:", error);
                return callBack(error);
            }
            console.log("Data inserted successfully:", results);
            return callBack(null, results);
        }
    );
};
const deleteUsers = (data, callBack) => {
    console.log(data);
    pool.query(
        `delete user1 where id=?`,
        [data.id]
        ,
        (error, results) => {
            if (error) {
                console.log("Database error:", error);
                return callBack(error);
            }
            console.log("Data inserted successfully:", results);
            return callBack(null, results);
        }
    );
};
const getUserByEmail = (email, password, callBack) => {

    pool.query(
        `select * from user1 where email=? `,
        [email],
        (error, results, fields) => {
            if (error) {
                console.error("Error in database query:", error);
                return callBack(error);
            }
            
            return callBack(null, results[0]);

        }
    );
};

module.exports = {
    create,
    getUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
    getUserByEmail

};
