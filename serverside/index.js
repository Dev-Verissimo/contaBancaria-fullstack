import express from "express";

import { v4 as uuidv4 } from "uuid"

const app = express()
app.use(express.json())

const customers = []

//middleware 

function verifyExistsAccountCpf(req, res, next) {
    const { cpf } = req.headers

    const customer = customers.find(customer => customer.cpf === cpf)

    if (!customer) {
        return res.status(400).json({
            error: "Customer not found"
        })
    }

    req.customer = customer

    return next()
    
}


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
        return resp.status(400).json({ error: "Customer already exists!"})
    } 

    customers.push({
        cpf,
        name,
        id,
        statement: []
    })
    return resp.status(201).send(customers)
    
})

app.get("/statement",verifyExistsAccountCpf, (req, res) => {
    const { customer } = req
    return res.json(customer.statement)
})

//middleware -> aquele que fica entre a requisição e o response

app.listen(3300)