// create user modl 
import { InferSchemaType, Schema, model } from 'mongoose';
import { config } from 'dotenv';
config();

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

    },
    {
        timestamps: true
    }
);

export type User = InferSchemaType<typeof UserSchema>;


const User = model<User>('User', UserSchema);

export default User;