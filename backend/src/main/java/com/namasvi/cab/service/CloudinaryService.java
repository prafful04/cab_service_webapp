package com.namasvi.cab.service;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String upload(MultipartFile file) throws IOException {

        Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap());

        return result.get("secure_url").toString();
    }
}
