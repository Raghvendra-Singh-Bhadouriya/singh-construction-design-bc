// const express = require("express")
// const router = express.Router()
// const projectModel = require("../Schemas/projectsSchema")

import express from "express"
import multer from "multer";
import projectModel from "../Schemas/projectsSchema.js"
import { uploadFileToCloudinary } from "../cloudinaryService.js";

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });


router.post("/add_project", upload.fields([{ name: "images", maxCount: 10 },{ name: "videos", maxCount: 5 },]), async (req, res) => {
    try {
      console.log("REQ BODY:", req.body);
      console.log("REQ FILES:", req.files);

      const { street, city, state, pincode } = req.body;

      if (!street || !city || !state || !pincode) {
        return res.status(400).json({ message: "Address fields are required" });
      }

      const imageFiles = req.files?.images || [];
      const videoFiles = req.files?.videos || [];

      if (imageFiles.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
      }

      const imageArray = [];
      const videoArray = [];

      // Upload images
      for (let i = 0; i < imageFiles.length; i++) {
        try {
          const file = imageFiles[i];
          const url = await uploadFileToCloudinary(
            file.buffer,
            `${street}-img-${Date.now()}-${i}`,
            "image"
          );
          imageArray.push({ url });
        } catch (err) {
          console.error(`Cloudinary image upload failed for ${imageFiles[i].originalname}:`, err);
          return res.status(500).json({ message: "Cloudinary image upload failed", error: err.message });
        }
      }

      // Upload videos
      for (let i = 0; i < videoFiles.length; i++) {
        try {
          const file = videoFiles[i];
          const url = await uploadFileToCloudinary(
            file.buffer,
            `${street}-vid-${Date.now()}-${i}`,
            "video"
          );
          videoArray.push({ url });
        } catch (err) {
          console.error(`Cloudinary video upload failed for ${videoFiles[i].originalname}:`, err);
          return res.status(500).json({ message: "Cloudinary video upload failed", error: err.message });
        }
      }

      const newProject = new projectModel({
        address: { street, city, state, pincode },
        image: imageArray,
        video: videoArray,
      });

      await newProject.save();

      res.status(201).json({ message: "Project added successfully", data: newProject });
    } catch (error) {
      console.error("Backend error in add_project:", error);
      res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });
    }
  }
);


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


//============== get request for specific video by id ==============//
router.get("/single_video/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectModel.findOne({"video._id": id})
        if(!project){
            return res.status(404).json({message: `Video not found`})
        }

        const video = project.video.id(id)
        if (!video) {
            return res.status(404).json({ message: "Video not found in project" })
        }
        
        console.log(video)
        res.status(200).json({
            message: "Video detail fetched successfully",
            data: video
        })
    } catch (error) {
        res.status(500).json({message: `Error in fetched single Video ${error.message}`})
    }
})


export default router;
//module.exports = router;
