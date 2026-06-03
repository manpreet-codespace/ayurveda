import Gallery  from  './gallery.model.js';

export const createGalleryService = async(file) =>{
    const imagePath = `/uploads/${file.filename}`;

    const gallery = await Gallery.create({
        image:imagePath
    })

    return gallery;

}

export const getUploadedImageService = async() =>{
        const gallery = await Gallery.findAll({
            order:[["created_at","ASC"]]
        });

        return gallery;
}

export const updateGalleryImageService = async(g_id, file) =>{
        const gallery = await Gallery.findByPk(g_id);

        if (!gallery) {
            return null;
        }

        gallery.image = `/uploads/${file.filename}`;
        await gallery.save();

        return gallery;
}

export const deleteGalleryImageService = async(g_id) =>{
        const gallery = await Gallery.findByPk(g_id);

        if (!gallery) {
            return null;
        }

        await gallery.destroy();

        return gallery;
}


