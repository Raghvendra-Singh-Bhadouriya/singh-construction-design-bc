const express = require("express")
const router = express.Router()
const projectModel = require("../Schemas/projectsSchema")

router.post("/add_project", async (req, res) => {
    try {
        
        const newProject = new projectModel(req.body)
        newProject.save()

        res.status(201).json({
            message: `Project added successfully`,
            data: newProject
        })
    } catch (error) {
        res.status(500).json({message: `Error in add project ${error.message}`})
    }
})

router.get("/projects", async (req, res) => {
    try {
        const allProjects = await projectModel.find()
        res.status(200).json({
            message: `All projects fetched successfully`,
            data: allProjects
        })
    } catch (error) {
        res.status(500).json({message: `Error in fetched projects ${error.message}`})
    }
})

router.get("/single_image/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectModel.findOne({"image._id": id})

        if(!project){
            return res.status(404).json({message: `Image not found`})
        }

        const image = project.image.id(id)
        
        console.log(image)
        res.status(200).json({
            message: "Image detail fetched successfully",
            data: image
        })
    } catch (error) {
        res.status(500).json({message: `Error in fetched single Image ${error.message}`})
    }
})

module.exports = router;


