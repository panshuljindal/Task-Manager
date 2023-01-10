require("../src/db/mongoose")
const User = require("../src/models/user")

// User.findByIdAndUpdate("63bdcfcf52cfb6148a8f2799", { age: 1 }).then((user) => {
//     return User.countDocuments({ age: 1 })
// }).then((users) => {
//     console.log(users)

// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount("63bdcfcf52cfb6148a8f2799", 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})