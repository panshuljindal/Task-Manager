require("../src/db/mongoose")
const Task = require("../src/models/task")

// Task.findByIdAndDelete("63bdda313f38d719490ad8c8").then(() => {
//     return Task.countDocuments({ completed: false })
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((e) => {
//     console.log(e)
// })

const findIDAndDelete = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}
findIDAndDelete('63bde4d48e2b601df9f7ed1f').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})