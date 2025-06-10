import { Request, Response, NextFunction } from 'express';
import { addPlant, categoryPlantItems, getAllPlants, searchedPlantItems, popularPlantItems, viewPlant } from '../dao/plant-dao';
import { Util } from '../utils/util';
import { IPlant } from '../schema/Plant';

// Add new plant item
export const addPlantItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        plantName, scientificName, family, origin, description,
        lightRequirements, wateringNeeds, humidityRequirements,
        soilType, fertilizer, temperatureRange, growthRate,
        matureSize, pruningTips, propagationMethods, toxicity,
        commonIssues, benefits
    } = req.body;
    const imageFile = req.file;

    try {
        if (!imageFile) {
            throw new Error('Image file is required');
        }

        const plantItem = await addPlant({
            plantName, scientificName, family, origin, description,
            lightRequirements, wateringNeeds, humidityRequirements,
            soilType, fertilizer, temperatureRange, growthRate,
            matureSize, pruningTips, propagationMethods, toxicity,
            commonIssues, benefits
        }, imageFile);

        return Util.sendSuccess(res, plantItem, 'Plant item added successfully');
    } catch (error) {
        next(error);
    }
};

// Get all plant items
export const getAllPlantItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const plantItems: IPlant[] = await getAllPlants();
        return Util.sendSuccess(res, plantItems, 'All plant items retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// Search plants by keyword
export const searchPlant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const keyword = req.query.keyword as string;
        const searchedPlants = await searchedPlantItems(keyword);
        Util.sendSuccess(res, searchedPlants, 'Plant items searched successfully');
    } catch (error) {
        next(error);
    }
};

// Filter plants by category (family)
export const catPlant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = req.query.category as string;
        if (!category) {
            throw new Error('Category is required');
        }
        const catPlants = await categoryPlantItems(category);
        Util.sendSuccess(res, catPlants, 'Plant items listed by category');
    } catch (error) {
        next(error);
    }
};

// Get popular plant items (based on views)
export const popularPlant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const popularPlants = await popularPlantItems();
        Util.sendSuccess(res, popularPlants, 'Popular plant items retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// View plant item
export const viewdPlant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const plantId = req.body.plantId as string;
        if (!plantId) {
            throw new Error('Plant ID is required');
        }
        const view = await viewPlant(plantId);
        Util.sendSuccess(res, view, 'Plant item viewed successfully');
    } catch (error) {
        next(error);
    }
};
