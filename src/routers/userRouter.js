const express = require('express')
const User = require("../models/user")
const router = new express.Router()
const auth = require("../middleware/auth")

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // console.log(token)
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({ "error": e })
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ message: "User logged out" })
    } catch (e) {
        res.status(500).send()
    }
})


router.get("/user", auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.get("/users/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (error) {
        res.status(500).send(error)
    }
})
router.patch("/users/:id", auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))


    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates" })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        if (!user) {
            res.status(404).send()
        }
        res.status(202).send(user)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete("/users/:id", auth, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            res.status(404).send()
        }
        res.status(202).send(user)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router