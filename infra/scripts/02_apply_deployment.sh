source ./config.file
all_images=$IMAGES
images=('posts')
for image in "${images[@]}"
do
    echo "start apply ${image}"
    cd ${PROJECT_DIR}/infra/k8s;
    kubectl apply -f ${image}-depl.yaml
    echo "end apply ${image}"
done
