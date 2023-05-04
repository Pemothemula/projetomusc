import usersModel from '../models/usersModel.js'


export const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body

        if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            return res.status(400).send({ message: 'Email inválido' });
        }

        if (password.length < 4) {
            return res.status(400).send({ message: 'A senha precisa ter no mínimo 4 caracteres' });
        }

        const existsEmail = await usersModel.findOne({ email: email });

        if (existsEmail) {
            return res.status(400).send({ message: 'Já existe uma conta com esse email' });
        }

        const createUser = await usersModel.create({
            email: email,
            name: name,
            password: password
        })

        if (createUser) {
            return res.send({ message: 'Criado com sucesso' });
        }

        res.status(500).send({ message: 'Ocorreu um erro interno, tente novamente mais tarde' })

    } catch (error) {
        res.status(400).send({ message: 'Preencha todos os campos' })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
        return res.status(400).send({ message: 'Email ou senha incorreto' });
    }

    if (password.length < 4) {
        return res.status(400).send({ message: 'Email ou senha incorreto' });
    }

    const user = await usersModel.findOne({ email: email });

    if (!user) {
        return res.status(400).send({ message: 'Email ou senha incorreto' });
    }

    if (user.password !== password) {
        return res.status(400).send({ message: 'Email ou senha incorreto' });
    }

    return res.send({ message: 'Logado com sucesso', email: user.email, token: 'qualquer coisa' })

}
