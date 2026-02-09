// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// --- STATE CONTROLLERS ---
// (No changes needed for State controllers)

export const getAllStates = async (req, res) => {
    try {
        const states = await prisma.state.findMany({
            orderBy: { name: 'asc' },
        });
        res.status(200).json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Server error while fetching states.' });
    }
};

export const createState = async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'State name is required and must be a non-empty string.' });
    }
    try {
        const existingState = await prisma.state.findUnique({ where: { name: name.trim() } });
        if (existingState) {
            return res.status(409).json({ message: 'A state with this name already exists.' });
        }
        const newState = await prisma.state.create({
            data: { name: name.trim() },
        });
        res.status(201).json(newState);
    } catch (error) {
        console.error('Error creating state:', error);
        res.status(500).json({ message: 'Server error while creating the state.' });
    }
};

export const deleteState = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.state.delete({ where: { id } });
        res.status(200).json({ message: 'State and all related regions and villages deleted successfully.' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'State not found.' });
        }
        console.error('Error deleting state:', error);
        res.status(500).json({ message: 'Server error while deleting the state.' });
    }
};


// --- REGION CONTROLLERS (UPDATED) ---

export const getAllRegions = async (req, res) => {
    try {
        // UPDATED: No major change here, but ensuring 'language' is returned by default.
        const regions = await prisma.region.findMany({
            include: { state: { select: { name: true } } },
            orderBy: { name: 'asc' },
        });
        res.status(200).json(regions);
    } catch (error) {
        console.error('Error fetching regions:', error);
        res.status(500).json({ message: 'Server error while fetching regions.' });
    }
};

export const createRegion = async (req, res) => {
    // UPDATED: Added 'language' to the destructuring.
    const { name, stateId, language } = req.body;
    if (!name || !stateId) {
        return res.status(400).json({ message: 'Region name and stateId are required.' });
    }
    try {
        const newRegion = await prisma.region.create({
            // UPDATED: Added 'language' to the data payload.
            // If language is not provided, Prisma will use the schema default ("en").
            data: { 
                name: name.trim(), 
                stateId,
                language: language || undefined 
            },
        });
        res.status(201).json(newRegion);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ message: 'The provided stateId does not exist.' });
        }
        console.error('Error creating region:', error);
        res.status(500).json({ message: 'Server error while creating the region.' });
    }
};

export const deleteRegion = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.region.delete({ where: { id } });
        res.status(200).json({ message: 'Region and its related villages deleted successfully.' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Region not found.' });
        }
        console.error('Error deleting region:', error);
        res.status(500).json({ message: 'Server error while deleting the region.' });
    }
};


// --- VILLAGE CONTROLLERS (UPDATED) ---

export const getAllVillages = async (req, res) => {
    try {
        // UPDATED: Include the state name via the region for geocoding context.
        const villages = await prisma.village.findMany({
            include: { 
                region: { 
                    select: { 
                        name: true,
                        state: {
                            select: { name: true }
                        }
                    } 
                } 
            },
            orderBy: { name: 'asc' },
        });
        res.status(200).json(villages);
    } catch (error) {
        console.error('Error fetching villages:', error);
        res.status(500).json({ message: 'Server error while fetching villages.' });
    }
};

export const createVillage = async (req, res) => {
    // UPDATED: Added 'latitude' and 'longitude'.
    const { name, regionId, latitude, longitude } = req.body;
    if (!name || !regionId) {
        return res.status(400).json({ message: 'Village name and regionId are required.' });
    }
    try {
        const newVillage = await prisma.village.create({
            // UPDATED: Added latitude and longitude, ensuring they are numbers or null.
            data: { 
                name: name.trim(), 
                regionId,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
            },
        });
        res.status(201).json(newVillage);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ message: 'The provided regionId does not exist.' });
        }
        console.error('Error creating village:', error);
        res.status(500).json({ message: 'Server error while creating the village.' });
    }
};

export const deleteVillage = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.village.delete({ where: { id } });
        res.status(200).json({ message: 'Village deleted successfully.' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Village not found.' });
        }
        console.error('Error deleting village:', error);
        res.status(500).json({ message: 'Server error while deleting the village.' });
    }
};

