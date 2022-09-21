const {body} = require("express-validator")

const registerValidation = () => {
    return[
        body("name").notEmpty().withMessage("O nome é obrigatório"),
        body("email").notEmpty().withMessage("O e-mail é obrigatório"),
        body("password").notEmpty().withMessage("A senha é obrigatória"),
        body('confirmpassword').custom((value, {req}) => {
            if(value != req.body.password) {
                throw new Error("As senhas não são iguais")
            }
            return true;
        })
    ]
}

module.exports = {registerValidation}