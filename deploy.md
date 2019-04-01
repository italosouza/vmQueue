# Backend


## Data container

A place to store persistent data

```bash
docker volume create datacontainer
```

### Listing volume data

To see how things are goint within the datacontainer

```bash
docker run -it --volumes-from datacontainer ubuntu /bin/bash
```

## Build And Run

   `Target` param came from dockerfile

```bash
docker build -t italosouza/vmqueue-api .
docker push italosouza/vmqueue-api
docker run --name vmqueue-api --mount source=datacontainer,target=/usr/src/app/tmp -tid -p 8080:8000 italosouza/vmqueue-api
docker container update --memory 256mb --memory-swap 256mb vmqueue-api
```

## Deploy

```bash
docker stop vmqueue-api && docker rm vmqueue-api && docker pull italosouza/vmqueue-api && docker run --name vmqueue-api --mount source=datacontainer,target=/usr/src/app/tmp -tid -p 8080:8000 italosouza/vmqueue-api
```

# Frontend

```bash
docker build -t italosouza/vmqueue-app .
docker push italosouza/vmqueue-app
docker run --name vmqueue-app -tid -p 80:80 italosouza/vmqueue-app
docker container update --memory 256mb --memory-swap 256mb vmqueue-app
```

## Deploy

```bash
docker stop vmqueue-app && docker rm vmqueue-app  && docker pull italosouza/vmqueue-app && docker run --name vmqueue-app -tid -p 80:80 italosouza/vmqueue-app
```
