const config = {
    firebase:{
        "type": "service_account",
        "project_id": "ecommerce-70a05",
        "private_key_id": "f633965452e43dd45897ef548e0a2668d44103ed",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjVR0WqFsZzNqa\nl1aUrwmj/PzIxX6FCjTPZVR9g+fNL6Qps+kRxUFxxj3es3CVEbykdpUXt4tY/jhH\nJUvbJbOUQc7qMvCfbRLztwRWMFvq4J56OTafGmrYgc9Gv1CjhQ8gO7MBeCgd2HBi\nh6Qyfa9o5UC3jMIR7zxSNWelX7RaE2DNLjPvuyUCPuip9tn8dxJhTOJr9rH+JUfg\n340dve+ZAqgeo32CzH7m7YnH3rhm+YTyOL4C7SXOibOPjQ8qFSv9crStm/vpWNz1\n9RboqVgvs4EBto7zY0IjXJjPm32qE91KeYwcD9oaI91Zuyx70LdIgoWVOrvuh/zB\nbQZHmDkDAgMBAAECggEAEQ2RaGyyekqfplVXtlViKct/rwyjrYtHwUGgpSww9wTa\n3HnKw063iwP6MLbGceH0sq0o2t2QgH2mbZMwzNQuYDPQwTYJVnPibyy0GLWa2zaR\nhUxU7h6peipvdEEET9ZUInbpNSWQ9rDC5x6nX5gsyMRq0d8x4gJ651BpHmSUJXVG\nwgKloRLETSUanxypy7oClFflY8QvVBaqREbFxRc7IfN0VImEfUmCLVxx9MqPAMRI\nwVLU2s6uNQ0B+u1PBXi7RlnIHglTqu6fBn7v4TP8NKlq+OGCpNhZGcglZQo6JEqC\nRCgCEn2wwG9T5B0xJ8dr+SZwYaMjdAp9RzVT/s9CbQKBgQDUunhAEfKXGLw+wFGt\nZaP4OGc1/Yb7vYpKLh66DpowTjOD20fDznhfVd/JpwIXcJEGs+LyCc3afpiTKJ9P\nZyHMos8M5HCJ8o4uR/rmb0u24FtmojtdJ6mbzAEIDNoW9QfX2X/1EZMwtWs5arhc\nP5XDuc17Qkkl4TvLT6YfXL0f1wKBgQDEjmvQJa1EHixN1KVO/qdROANVYil71xAe\nV+5fkdLx7Jlxcmk/0cXcYJlYmN08LYacJr4sSc1zxBoXx9/Qh+c0NqoSrqVUb3BG\nXf0+QXAiZhY2m9keluqujHAUfFuhY6FRDBlAcrXbgPcbttnC0t8q1TJt+KVo0Ake\nNObTm2Y6tQKBgHTO10zHDh/tkyAZ1j+SOhEIV5QL3FzK3O6SmIitj/jKV/slIyjf\nbLVcn/9IVxur0daOXCVvQLujHABiI+gjxylolKyNm0YEDBJZr+lsX3TRiR64IkSq\njLVhtYdIF1DXxzC820gkGGB8nZ3vfcAZohDRK4VtBmFoZb7jw2IhODANAoGAYA6q\nKcL/9jY4uKCfWQeihVK2blfWpiroOawHVrVRPeG+625aeVHvPFAJIP8zv2EQU+er\nMMGwok7H4a9Qdfy0xROh8hdfvO/pErqENJSOVIFHgdCQPx7J+huv+pL7xNeH0q/y\n90gYD/nqyaSGr2uWnLwsNQo67AofKp/33ponT7ECgYBO2UhSHvKJISoes8HiAeDV\nJnElRZVd9uqRIF4jRoROmpfKlpvLlS7x2DjiQ4ONQWsltq0K+gh9OQqpm9Iwuqlg\nTEy237AhkyWq9yVtkXQvTGXGJQzTyZPSG6c9OV6W8JL1/MQpOqVOR2ecyf1d7G5+\nsAHI4tSmRG+z7Y2dAxqyDA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-docax@ecommerce-70a05.iam.gserviceaccount.com",
        "client_id": "108442832545988337435",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-docax%40ecommerce-70a05.iam.gserviceaccount.com"
    },
    mongodb: {
        cnxStr: 'mongodb://127.0.0.1:27017/ecommerce',
    },
}

module.exports = config;