# Backend

```bash
docker build -t italosouza/vmqueue-api .
docker push italosouza/vmqueue-api
docker run --name vmqueue-api -tid -p 8080:8000 italosouza/vmqueue-api
docker container update --memory 256mb --memory-swap 256mb vmqueue-api
```

# Frontend

```bash
docker build -t italosouza/vmqueue-app .
docker push italosouza/vmqueue-app
docker run --name vmqueue-app -tid -p 80:80 italosouza/vmqueue-app
docker container update --memory 256mb --memory-swap 256mb vmqueue-app
```

```bash
docker stop vmqueue-app && docker rm vmqueue-app  && docker pull italosouza/vmqueue-app && docker run --name vmqueu e-app -tid -p 80:80 italosouza/vmqueue-app
```
