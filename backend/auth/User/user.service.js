import bcrypt from 'bcrypt';
import User from './user.model.js';

export const savedUserService = async ({ name, email, phonenumber, password }, transaction) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                name,
                email,
                phonenumber,
                password: hashedPassword
            },
            { transaction }
        );

        return user;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};