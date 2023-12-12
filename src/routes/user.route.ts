import { Router } from 'express';

import { signUp, signin } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validationRequest';
import { signUpValidation, signinValidation } from '../validations/user.validation';


const router = Router();

router.route('/signup')
    .post(
        validateRequest(signUpValidation),
        signUp);

router.route('/signin')

    .post(
        validateRequest(signinValidation),
        signin);

export default router;