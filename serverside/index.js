import express from "express";

import { v4 as uuidv4 } from "uuid"

const app = express()
app.use(express.json())

const customers = []


// requisito 1 
//- [] Deve ser possível criar umma conta

/*
    o que uma conta precisa ter:
    - cpf - string
    - nome - string
    - id - uuid
    - statement: []
*/

app.post("/account", (req, resp) => {

    const { cpf, name } = req.body

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

    const id = uuidv4()
    if (customerAlreadyExists) {
        return resp.status(400).json({ error: "CPF já existente, tente logar"})
    } 

    customers.push({
        cpf,
        name,
        id,
        statement: []
    })
    return resp.status(201).send(customers)
    
})

app.listen(3300)