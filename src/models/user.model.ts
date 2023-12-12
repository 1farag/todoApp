import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
interface IUser extends Document {
    password: string;
    isModified: (path: string) => boolean;
}


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [ true, 'Please add a username' ],
            unique: true,
            trim: true,
            minlength: [ 3, 'Username must be at least 3 characters long' ],
            maxlength: [ 30, 'Username must not be more than 30 characters long' ]
        },
        email: {
            type: String,
            required: [ true, 'Please add an email' ],
            unique: true,
            trim: true,
            minlength: [ 3, 'Email must be at least 3 characters long' ],
            maxlength: [ 30, 'Email must not be more than 30 characters long' ]
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            trim: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            maxlength: [30, 'Password must not be more than 30 characters long']
        },

    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (this: IUser, next: Function) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.hash(this.password, 10);
    this.password = salt;
    next();
});


UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
}


UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}


UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}


UserSchema.statics.findByCredentials = async function (email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    return user;
}

export type User = InferSchemaType<typeof UserSchema>;


const User = model<User>('User', UserSchema);

export default User;