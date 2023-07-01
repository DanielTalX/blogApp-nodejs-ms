source ./config.file
all_images=$IMAGES
images=('posts')
for image in "${images[@]}"
do
    echo "start build & push ${image}"
    local_image=${DOCKER_ID}/${image}
    remote_image=${DOCKER_ID}/${PROJECT_NAME}:${image}
    cd ${PROJECT_DIR}/${image};
    docker build -t ${remote_image} .
    docker tag ${remote_image} ${remote_image}
    docker push ${remote_image}
    echo "end build & push ${image}"
done
