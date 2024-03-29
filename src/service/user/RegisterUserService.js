import EmailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

const createPasswordValidator = () => {
    const passwordValidator = new PasswordValidator();

    passwordValidator
        .is().min(8, 'Password should have a minimum length of 8 characters!')                                    
        .is().max(100, 'Password should have a maximum length of 100 characters!')                                  
        .has().uppercase(1, 'Password should have a minimum of 1 uppercase letter!')                              
        .has().lowercase(1, 'Password should have a minimum of 1 lowercase letter!')                              
        .has().digits(2, 'Password should have a minimum of 2 digits!')                                
        .has().not().spaces(0, 'Password should not have spaces!');
        
    return passwordValidator;
};

function RegisterUserService() {
    const validateName = (name) => {
        const isNameEmpty = name.trim() === '';

        if (isNameEmpty) {
            throw 'Enter a name!';
        }

        const isNameValid = name.length > 2;

        if (isNameValid === false) {
            throw 'Name should have a minimum 3 characters!';
        }
    };

    const validateEmail = (email) => {
        const isEmailValid = EmailValidator.validate(email);

        if (isEmailValid === false) {
            throw 'Enter a valid email!';
        }
    };

    const validatePassword = (password) => {
        const passwordValidator = createPasswordValidator();

        function isPasswordValid() {
            return passwordValidator.validate(password);
        }
    
        function getPasswordErrorMessage() {
            const passwordError = passwordValidator.validate(password, { details: true });
            return passwordError[0].message;
        }

        if (isPasswordValid() === false) {
            throw getPasswordErrorMessage();
        }
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        function checkConfirmPassword() {
            return password === confirmPassword;
        }

        if (checkConfirmPassword() === false) {
            throw 'Please, make sure your password match!';
        }
    };

    const validateUserData = (name, email, password, confirmPassword) => {
        validateName(name);
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(password, confirmPassword);
    };

    return { validateUserData };
}

export default RegisterUserService;
