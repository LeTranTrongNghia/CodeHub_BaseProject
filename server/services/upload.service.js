import cloudinaryService from './cloudinary.service.js';

class UploadService {
	async uploadSingelImage(file) {
		const { url } = await cloudinaryService.uploadImage('CodeHub', file.buffer);
		const result = { imageUrl: url };
		return result;
	}

	async uploadMultipleImages(files) {
		const uploadPromises = files.map(file => this.uploadSingelImage(file));
		const results = await Promise.all(uploadPromises);
		return results;
	}
}

const uploadService = new UploadService();
export default uploadService;
