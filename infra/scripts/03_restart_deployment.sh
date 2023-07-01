source ./config.file
all_images=$IMAGES
images=('posts')
for image in "${images[@]}"
do
    echo "start restart ${image}"
    cd ${PROJECT_DIR}/infra/k8s;
    kubectl rollout restart deployment ${image}-depl
    echo "end restart ${image}"
done
