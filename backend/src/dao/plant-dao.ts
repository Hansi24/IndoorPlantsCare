import { Plant } from '../schema/Plant';
import { Image } from '../schema/Image';
import path from 'path';
import { PlantView } from '../schema/PlantView';

// Add plant to database
export const addPlant = async (plantData: any, imageFile: Express.Multer.File) => {
    try {
        const image = new Image({
            filename: imageFile.filename,
            url: path.join('uploads', imageFile.filename),
        });

        const savedImage = await image.save();

        const newPlant = new Plant({
            ...plantData,
            image: savedImage._id,
        });

        await newPlant.save();
        return newPlant;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get all plants from the database
export const getAllPlants = async () => {
    try {
        const plantData = await Plant.find().populate('image');
        return plantData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Search plants by keyword
export const searchedPlantItems = async (keyword: string) => {
    try {
        if (!keyword) {
            const allPlants = await Plant.find().populate('image');
            return allPlants;
        }

        const regex = new RegExp(keyword, 'i');
        const plants = await Plant.find({
            $or: [
                { plantName: regex },
                { scientificName: regex },
                { family: regex },
                { origin: regex },
                { description: regex },
            ],
        }).populate('image');
        return plants;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get plants by category (family)
export const categoryPlantItems = async (family: string) => {
    try {
        if (!family) {
            throw new Error('Invalid family category');
        }
        const plantsByFamily = await Plant.find({ family }).populate('image');
        return plantsByFamily;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get popular plants based on views
export const popularPlantItems = async () => {
    try {
        const popularPlants = await PlantView.aggregate([
            // Step 1: Group by plant ID and sum views
            {
                $group: {
                    _id: "$plant",
                    viewCount: { $sum: "$view" }
                }
            },
            // Step 2: Sort by highest view count
            { $sort: { viewCount: -1 } },
            // Step 3: Limit to top 5
            { $limit: 5 },
            // Step 4: Lookup plant details
            {
                $lookup: {
                    from: "plants", // Plant collection name
                    localField: "_id",
                    foreignField: "_id",
                    as: "plantDetails"
                }
            },
            { $unwind: "$plantDetails" },
            // Step 5: Lookup image details
            {
                $lookup: {
                    from: "images",
                    localField: "plantDetails.image",
                    foreignField: "_id",
                    as: "imageDetails"
                }
            },
            { $unwind: "$imageDetails" },
            // Step 6: Project final output
            {
                $project: {
                    _id: 0,
                    plantId: "$_id",
                    plantName: "$plantDetails.plantName",
                    viewCount: 1,
                    image: {
                        url: "$imageDetails.url"
                    }
                }
            }
        ]);

        return popularPlants;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// View plant item
export const viewPlant = async (plantId: string) => {
    try {
        if (!plantId) {
            throw new Error('Plant ID is required');
        }

        // Step 1: Check if the plant exists
        const plantExists = await Plant.findById(plantId);
        if (!plantExists) {
            throw new Error('Plant not found');
        }

        // Step 2: Check if the plant exists in PlantView collection
        const plantView = await PlantView.findOne({ plant: plantId });

        if (plantView) {
            // If the plant view record exists, increment the count
            plantView.view += 1;
            await plantView.save();
        } else {
            // If no record exists, create a new one with view count = 1
            await PlantView.create({ plant: plantId, view: 1 });
        }

        return { message: 'View updated successfully' };
    } catch (error) {
        console.error(error);
        throw error;
    }
};