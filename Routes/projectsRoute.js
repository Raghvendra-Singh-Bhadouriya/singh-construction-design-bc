//const express = require("express")
// const router = express.Router()
// const projectModel = require("../Schemas/projectsSchema")

import express from "express"
import multer from "multer";
import projectModel from "../Schemas/projectsSchema.js"
import { uploadImageToCloudinary } from "../cloudinaryService.js";

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/add_project", upload.array("images"), async (req, res) => {
    try {
        const { street, city, state, pincode } = req.body;

        if (!street || !city || !state || !pincode) {
            return res.status(400).json({ message: "Address fields are required" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        const imageArray = [];

        // Upload each image to Cloudinary
        for (let i = 0; i < req.files.length; i++) {
            const fileBuffer = req.files[i].buffer;
            const publicId = `${street}-${Date.now()}-${i}`;
            const url = await uploadImageToCloudinary(fileBuffer, publicId);
            imageArray.push({ url });
        }

        // Save project in MongoDB
        const newProject = new projectModel({
            address: { street, city, state, pincode },
            image: imageArray,
        })
        await newProject.save()

        res.status(201).json({
            message: `Project added successfully`,
            data: newProject
        })
    } catch (error) {
        res.status(500).json({message: `Error in add project ${error.message}`})
    }
})

//============== get request for all project ===============//
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

//============== get request for specific image by id ==============//
router.get("/single_image/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectModel.findOne({"image._id": id})
        if(!project){
            return res.status(404).json({message: `Image not found`})
        }

        const image = project.image.id(id)
        if (!image) {
            return res.status(404).json({ message: "Image not found in project" })
        }
        
        console.log(image)
        res.status(200).json({
            message: "Image detail fetched successfully",
            data: image
        })
    } catch (error) {
        res.status(500).json({message: `Error in fetched single Image ${error.message}`})
    }
})


export default router;
//module.exports = router;
